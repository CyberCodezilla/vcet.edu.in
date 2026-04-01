import fs from 'fs';
import path from 'path';

const basePath = 'c:\\edu_vcet\\vcet.edu.in\\pages\\departments';

const departments = {
  'DeptAIDS.tsx': { name: 'Artificial Intelligence and Data Science', id: 'aids' },
  'DeptCivil.tsx': { name: 'Civil Engineering', id: 'civil' },
  'DeptComputerEngg.tsx': { name: 'Computer Engineering', id: 'computer' },
  'DeptCSDS.tsx': { name: 'Computer Science and Engineering (Data Science)', id: 'csds' },
  'DeptENTC.tsx': { name: 'Electronics and Telecommunication Engineering', id: 'entc' },
  'DeptMech.tsx': { name: 'Mechanical Engineering', id: 'mechanical' },
};

Object.keys(departments).forEach(file => {
  const filePath = path.join(basePath, file);
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${file}`);
    return;
  }

  let code = fs.readFileSync(filePath, 'utf-8');

  // Skip if already processed
  if (code.includes('<NewsletterSection')) {
    console.log(`Already processing ${file}`);
    return;
  }

  // Add import if not present
  const importStatement = "import NewsletterSection from '../../components/NewsletterSection';";
  if (!code.includes(importStatement)) {
    code = code.replace(
      "import DepartmentFacultySection from '../../components/DepartmentFacultySection';",
      `import DepartmentFacultySection from '../../components/DepartmentFacultySection';\nimport NewsletterSection from '../../components/NewsletterSection';`
    );
  }

  let newCode = code.replace(
    /\{\s*activeId\s*===\s*'newsletter'\s*&&\s*\(\(\)\s*=>\s*\{[\s\S]*?\}\)\(\)\s*\}/,
    `{activeId === 'newsletter' && (
            <NewsletterSection departmentName="${departments[file].name}" departmentId="${departments[file].id}" />
          )}`
  );

  if (newCode === code) {
      newCode = code.replace(
        /\{\s*activeId\s*===\s*'newsletter'\s*&&\s*\([\s\S]*?\n\s+\)\s*\}/,
        `{activeId === 'newsletter' && (
            <NewsletterSection departmentName="${departments[file].name}" departmentId="${departments[file].id}" />
          )}`
      );
  }

  if (newCode !== code) {
    fs.writeFileSync(filePath, newCode, 'utf-8');
    console.log(`Updated ${file}`);
  } else {
    console.log(`Could not find newsletter block in ${file}`);
  }
});
