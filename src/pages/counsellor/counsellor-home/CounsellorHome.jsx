import React, { useState } from 'react';
import Sidebar from '../../../components/common/sidebar/Sidebar';
import CounsellorPosts from '../counsellor-posts/CounsellorPosts';

const CounsellorHome = () => {
  const [selected, setSelected] = useState('Posts');

  const handleSelect = (item) => {
    setSelected(item);
  };

  return (
    <div className="flex h-full bg-gray-100 ">
      {/* Sidebar */}
      
      <Sidebar items={['Posts']} selected={selected} onSelect={handleSelect} />

      {/* Main Content */}
      <div className="flex-1 h-full overflow-y-auto "> {/* Adjust ml-48 based on your sidebar width */}
        {selected === 'Posts' && <CounsellorPosts />}
      </div>
    </div>
  );
};

export default CounsellorHome;
