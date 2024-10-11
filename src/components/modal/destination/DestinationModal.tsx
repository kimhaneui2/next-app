import { majorDestination } from '@/services/apiService';
import useUserStore from '@/store/userStore';
import React, { useEffect, useRef, useState } from 'react';

interface Station {
  stationCode: string;
  stationNameKo: string;
  majorOrder?: number;
  groupNo?: number;
  groupName?: string;
}

interface ModalProps {
  visible: boolean;
  placeholder?: string;
  title?: string;
  itemCategoryCode: string;
  onClose: () => void;
  onSelected: (station: Station | string) => void;
}

const DestinationModal: React.FC<ModalProps> = ({
  visible,
  placeholder = '도시/공항명 입력',
  title = '출발지 선택',
  itemCategoryCode,
  onClose,
  onSelected,
}) => {
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [destinationList, setDestinationList] = useState<any>([]);
  const userInfo = useUserStore((state) => state.userInfo);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(0);
  const callDestinationCalled = useRef(false);
  const handleSelectDestination = (index: number) => {
    setSelectedIndex(index === selectedIndex ? null : index);
  };

  const callDestination = async () => {
    try {
      const condition = {
        compCode: userInfo?.compCode,
        itemCategoryCode,
      };
      const result = await majorDestination(condition);
      setDestinationList(result);
    } catch (err: any) {}
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
    setLoading(true);
  };

  const handleInputBlur = () => {
    setLoading(false);
  };

  useEffect(() => {
    if (!callDestinationCalled.current) {
      callDestination();
      callDestinationCalled.current = true;
    }
    return () => {
      setSelectedIndex(0);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="modal type1">
      <div className="modal-contents">
        {/* 모달 헤더 */}
        <div className="modal-header">
          <h1 className="title">{title}</h1>
          <button type="button" className="btn-modal-close" onClick={onClose}>
            닫기
          </button>
        </div>

        {/* 모달 바디 */}
        <div className="modal-body default modal-full">
          {/* 검색 입력창 */}
          <div className="input md line search">
            <input
              type="text"
              value={keyword}
              placeholder={placeholder}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
            />
          </div>

          {/* 로딩 표시 */}
          {loading && (
            <div className="common-loading result">
              <i className="icon-spinner"></i>
            </div>
          )}

          {/* 검색 결과 렌더링 */}
          {!loading && (
            <>
              <div className="major-destination">
                <h2 className="contents-title3">
                  <strong>지역 선택</strong>
                </h2>
                <div className="destination-list">
                  <ul className="depth1">
                    {destinationList.map((destination: any, index: number) => (
                      <li key={index}>
                        <button
                          type="button"
                          className={`destination-item ${
                            selectedIndex === index ? 'active' : ''
                          }`}
                          onClick={() => handleSelectDestination(index)}>
                          {destination.groupName}
                        </button>
                      </li>
                    ))}
                  </ul>
                  {selectedIndex !== null && (
                    <ul className="depth2">
                      {destinationList[selectedIndex].items.map(
                        (item: any, subIndex: number) => (
                          <li key={subIndex}>
                            <button
                              type="button"
                              onClick={() => onSelected(item)}>
                              <span>{item.destinationNameLn}</span>
                            </button>
                          </li>
                        )
                      )}
                    </ul>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DestinationModal;
