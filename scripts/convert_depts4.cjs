const fs = require('fs');
const path = require('path');

const departmentsToProcess = [
  { file: 'DeptCivil.tsx', slug: 'civil-engineering' },
  { file: 'DeptComputerEngg.tsx', slug: 'computer-engineering' },
  { file: 'DeptCSDS.tsx', slug: 'computer-science-data-science' },
  { file: 'DeptENTC.tsx', slug: 'electronics-telecommunication' },
  { file: 'DeptFE.tsx', slug: 'first-year-engineering' },
  { file: 'DeptIT.tsx', slug: 'information-technology' },
  { file: 'DeptMech.tsx', slug: 'mechanical-engineering' }
];

const filesPath = path.join(__dirname, '..', 'pages', 'departments');

for (const dept of departmentsToProcess) {
    const filePath = path.join(filesPath, dept.file);
    if (!fs.existsSync(filePath)) {
        continue;
    }

    let content = fs.readFileSync(filePath, 'utf8');

    // Mappings and replacements ensuring hooks get in
    if (!content.includes('const [department, setDepartment] = useState')) {
        const componentRegex = new RegExp(\const\\\\s+[A-Za-z0-9]+\\\\s*:\\\\s*React\\\\.FC\\\\s*=\\\\s*\\\\(\\\\)\\\\s*=>\\\\s*\\\\{\);
        const match = content.match(componentRegex);
        
        if (match) {
            const insertionPoint = match.index + match[0].length;
            const hookText = \\\n  const [department, setDepartment] = useState<any | null>(null);\\n  const [loadingDb, setLoadingDb] = useState(true);\\n\\n  useEffect(() => {\\n    const fetchDept = async () => {\\n      try {\\n        const response = await departmentApi.getBySlug('\');\\n        console.log('Fetched department \:', response);\\n        setDepartment(response.data || response);\\n      } catch (err) {\\n        console.error('Error fetching department data:', err);\\n      } finally {\\n        setLoadingDb(false);\\n      }\\n    };\\n    fetchDept();\\n  }, []);\\n\;
            content = content.slice(0, insertionPoint) + hookText + content.slice(insertionPoint);
        }
    }
    
    if (!content.includes('import { departmentApi')) {
        content = content.replace("import React from 'react';", "import React, { useEffect, useState } from 'react';\nimport { departmentApi, resolveApiUrl } from '../../admin/api/client';\n");
        if(content.includes("import React, { useState } from 'react';")) {
             content = content.replace("import React, { useState } from 'react';", "import React, { useEffect, useState } from 'react';\nimport { departmentApi, resolveApiUrl } from '../../admin/api/client';\n");
        }
    }

    // Try normal replaces for arrays - WARNING: WE NEED TO MATCH "index" OR "idx" depending on file!
    content = content.replace(/\{dabMembers\.map\(\(member,\s*idx\)/g, "{(department?.content?.dabMembers?.length ? department.content.dabMembers : dabMembers).map((member: any, idx)");
    content = content.replace(/\{toppers\.map\(\(topper,\s*idx\)/g, "{(department?.content?.toppers?.length ? department.content.toppers : toppers).map((topper: any, idx)");
    content = content.replace(/achievements\.map\(\s*\(ach,\s*idx\)/g, "(department?.content?.achievements?.length ? department.content.achievements : achievements).map((ach: any, idx)");
    content = content.replace(/\{syllabusFiles\.map\(\(file,\s*idx\)/g, "{(department?.content?.syllabus?.length ? department.content.syllabus : syllabusFiles).map((file: any, idx)");
    content = content.replace(/\{timeTables\.map\(\(file,\s*idx\)/g, "{(department?.content?.academicCalendars?.length ? department.content.academicCalendars : timeTables).map((file: any, idx)");

    // Catch index variant 
    content = content.replace(/\{dabMembers\.map\(\(member,\s*index\)/g, "{(department?.content?.dabMembers?.length ? department.content.dabMembers : dabMembers).map((member: any, index)");
    content = content.replace(/\{toppers\.map\(\(topper,\s*index\)/g, "{(department?.content?.toppers?.length ? department.content.toppers : toppers).map((topper: any, index)");
    content = content.replace(/\{achievements\.map\(\(ach,\s*index\)/g, "{(department?.content?.achievements?.length ? department.content.achievements : achievements).map((ach: any, index)");
    content = content.replace(/\{syllabusFiles\.map\(\(file,\s*index\)/g, "{(department?.content?.syllabus?.length ? department.content.syllabus : syllabusFiles).map((file: any, index)");
    content = content.replace(/\{timeTables\.map\(\(file,\s*index\)/g, "{(department?.content?.academicCalendars?.length ? department.content.academicCalendars : timeTables).map((file: any, index)");

    
    // Fix urls
    // Only resolve if not already resolved!
    if (!content.includes('href={resolveApiUrl')) {
        content = content.replace(/href=\{file\.url\}/g, "href={resolveApiUrl(file.url as string) || '#'}");
        content = content.replace(/href=\{ach\.pdf\}/g, "href={resolveApiUrl(ach.pdf as string) || '#'}");
    }

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(\Successfully updated \ with dynamic department connections.\);
}

console.log("All files updated successfully!");
