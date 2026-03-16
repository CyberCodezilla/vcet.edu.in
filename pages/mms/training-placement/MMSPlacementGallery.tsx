import React from 'react';
import MMSLayout from '../../../components/mms/MMSLayout';
import { PlacementImageHolder, PlacementSectionCard } from './MMSPlacementShared';

export default function MMSPlacementGallery() {
  return (
    <MMSLayout title="Gallery">
      <PlacementSectionCard title="Placement Gallery" subtitle="Highlights from placement activities, sessions, and engagement events">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
            <PlacementImageHolder key={index} label={`Placement Gallery ${index.toString().padStart(2, '0')}`} size="large" />
          ))}
        </div>
      </PlacementSectionCard>
    </MMSLayout>
  );
}
