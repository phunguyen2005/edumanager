import React, { useState } from 'react';
import { Layout } from '../../components/Layout';
import { ViewState } from '../../types';
import ApprovalList from './views/ApprovalList';
import ApprovalDetail from './views/ApprovalDetail';

const ApprovalManager = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.APPROVAL_LIST);

  const renderView = () => {
    switch (currentView) {
      case ViewState.APPROVAL_LIST:
        return <ApprovalList onChangeView={setCurrentView} />;
      case ViewState.APPROVAL_DETAIL:
        return <ApprovalDetail onChangeView={setCurrentView} />;
      default:
        return <ApprovalList onChangeView={setCurrentView} />;
    }
  };

  const getBreadcrumbs = () => {
      const base = ['Ban Giám Hiệu', 'Phê duyệt'];
      if (currentView === ViewState.APPROVAL_DETAIL) return [...base, 'Chi tiết Học bạ'];
      return base;
  }

  return (
    <Layout breadcrumbs={getBreadcrumbs()}>
      {renderView()}
    </Layout>
  );
};

export default ApprovalManager;