import React, { useState } from 'react';
import { Layout } from '../../components/Layout';
import { ViewState } from '../../types';
import ClassStructureList from './views/ClassStructureList';
import AddClass from './views/AddClass';
import ClassStructureMove from './views/ClassStructureMove';

const ClassManager = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.CLASS_STRUCTURE_LIST);

  const renderView = () => {
    switch (currentView) {
      case ViewState.CLASS_STRUCTURE_LIST:
        return <ClassStructureList onChangeView={setCurrentView} />;
      case ViewState.ADD_CLASS:
        return <AddClass onChangeView={setCurrentView} />;
      case ViewState.CLASS_STRUCTURE_MOVE:
        return <ClassStructureMove onChangeView={setCurrentView} />;
      default:
        return <ClassStructureList onChangeView={setCurrentView} />;
    }
  };

  const getBreadcrumbs = () => {
      const base = ['Ban Giám Hiệu', 'Quản lý lớp'];
      if (currentView === ViewState.ADD_CLASS) return [...base, 'Thêm lớp mới'];
      if (currentView === ViewState.CLASS_STRUCTURE_MOVE) return [...base, 'Chuyển lớp'];
      return base;
  }

  return (
    <Layout breadcrumbs={getBreadcrumbs()}>
      {renderView()}
    </Layout>
  );
};

export default ClassManager;