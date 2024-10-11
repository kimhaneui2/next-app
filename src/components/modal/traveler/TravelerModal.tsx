import React, { useEffect, useState } from 'react';

import { corporateStaff } from '@/services/apiService';
import useStaffStore from '@/store/staffStore';
import useUserStore from '@/store/userStore';

import SearchForm from './component/SearchForm';

interface TravelerSearchModalProps {
  visible: boolean;
  onClose: () => void;
  corporateInfo?: {
    outsideStaffBookingYn: boolean;
  };
  onSelectTraveler: (traveler: { name: string; type: string }) => void;
}

const TravelerModal: React.FC<TravelerSearchModalProps> = ({
  visible,
  onClose,
  corporateInfo,
  onSelectTraveler,
}) => {
  const [activeTab, setActiveTab] = useState<string>('U06');
  const [scrollTop, setScrollTop] = useState<number>(0);
  const userInfo = useUserStore((state) => state.userInfo);
  const setResultList = useStaffStore((state) => state.setResultList);
  const resetStaffList = useStaffStore((state) => state.resetStaffList);

  useEffect(() => {
    if (!visible) {
      resetStaffList();
    }
  }, [visible, resetStaffList]);

  const onChangeActiveTab = (tab: string) => {
    setActiveTab(tab);
  };
  const onScroll = (event: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(event.currentTarget.scrollTop);
  };
  const onSearch = (keyword: string) => {
    handleSearch(keyword);
  };
  const handleSearch = async (keyword: string) => {
    try {
      const condition = {
        name: keyword,
        corporateCompCode: userInfo?.compCode,
        userTypeCode: activeTab,
        userStatusCode: 'USS01',
        limits: [0, 20],
      };
      const resultList = await corporateStaff(condition);
      setResultList(resultList);
    } catch (err: any) {}
  };
  if (!visible) return null;

  return (
    <div className="modal type1" style={{ color: 'black' }}>
      <div className="modal-contents">
        <div className="modal-header">
          <h1 className="title">출장자 검색</h1>
          <button type="button" className="btn-modal-close" onClick={onClose}>
            닫기
          </button>
        </div>
        <div className="modal-body" onScroll={onScroll}>
          <div className="tab-header type1">
            <label className="tab-header-item">
              <input
                type="radio"
                name="tab1"
                className="tab-input"
                checked={activeTab === 'U06'}
                onChange={() => onChangeActiveTab('U06')}
              />
              <span className="tab-text">임직원</span>
            </label>
            {corporateInfo?.outsideStaffBookingYn && (
              <label className="tab-header-item">
                <input
                  type="radio"
                  name="tab1"
                  className="tab-input"
                  checked={activeTab === 'U07'}
                  onChange={() => onChangeActiveTab('U07')}
                />
                <span className="tab-text">외부인</span>
              </label>
            )}
          </div>

          {/* 임직원 검색 */}
          {activeTab === 'U06' && (
            <div className="contents-box type1">
              {/* Search 컴포넌트 호출 - 임직원 */}
              <SearchForm
                placeholder="직원 검색"
                userTypeCode="U06"
                onSelectTraveler={onSelectTraveler}
                onSearch={onSearch}
              />
            </div>
          )}

          {/* 외부인 검색 */}
          {activeTab === 'U07' && (
            <div className="contents-box type1">
              {/* Search 컴포넌트 호출 - 외부인 */}
              <SearchForm
                placeholder="외부인 검색"
                userTypeCode="U07"
                onSelectTraveler={onSelectTraveler}
                onSearch={onSearch}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TravelerModal;
