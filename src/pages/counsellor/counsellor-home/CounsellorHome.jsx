import React, { useState } from 'react';
import ComponentB from '../../../components/dummy/ComponentB';
import ComponentC from '../../../components/dummy/ComponentC';
import Sidebar from '../../../components/common/sidebar/Sidebar';
import CounsellorPosts from '../counsellor-posts/CounsellorPosts';

const CounsellorHome = () => {
  const [selected, setSelected] = useState('Posts');

  const handleSelect = (item) => {
    setSelected(item);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      
      <Sidebar items={['Posts', 'B', 'C']} selected={selected} onSelect={handleSelect} />

      {/* Main Content */}
      <div className="flex-1 h-full overflow-y-auto "> {/* Adjust ml-48 based on your sidebar width */}
        {selected === 'Posts' && <CounsellorPosts />}
        {selected === 'B' && <ComponentB />}
        {selected === 'C' && <ComponentC />}
      </div>
    </div>
  );
};

export default CounsellorHome;
