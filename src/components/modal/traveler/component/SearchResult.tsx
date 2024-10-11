import useStaffStore from '@/store/staffStore';
import React from 'react';

interface SearchResultProps {
  outsideStaffYn: boolean; // 외부 직원 여부
  onSelectStaffEvent: (staff: any) => void; // 직원 선택 핸들러
}

const SearchResult: React.FC<SearchResultProps> = ({
  outsideStaffYn,
  onSelectStaffEvent,
}) => {
  const staffList = useStaffStore((state) => state.staffList ?? []);

  const isEmptySearchResult = () => {
    if (staffList?.length === 0) {
      return true;
    }
    return false;
  };

  const isEmptyData = (staff: any) => {
    return true;
  };
  return (
    <>
      {/* 직원 리스트가 있을 때 */}
      {staffList && staffList.length > 0 && (
        <ul className="staff-search-list">
          {staffList.map((staff, index) => (
            <li key={index}>
              <button type="button" onClick={() => onSelectStaffEvent(staff)}>
                <dl>
                  <dt>
                    <span>{staff.name}</span>
                    <span>
                      {staff.lastName}/{staff.firstName}
                      {staff.gender === 'M' && <span>(남성)</span>}
                      {staff.gender === 'F' && <span>(여성)</span>}
                    </span>
                  </dt>
                  {!outsideStaffYn && (
                    <dd>
                      <span>{staff.corporateCompName}</span>
                      <span>{staff.deptName}</span>
                    </dd>
                  )}
                  {outsideStaffYn && (
                    <dd>
                      <span>{staff.outsideStaffTypeName}</span>
                    </dd>
                  )}
                  {/* 사용자 정보가 비어 있을 때 */}
                  {isEmptyData(staff) && <span>사용자정보 등록 필요</span>}
                </dl>
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* 검색 결과가 비어 있을 때 */}
      {isEmptySearchResult() && (
        <div className="common-list-nodata">
          <em className="icon common-alert2"></em>
          <p>
            검색 결과가 없습니다.
            <br />
            사용자 등록을 하지 않은 임직원은 등록 후 이용하시기 바랍니다.
            <br />
            외부인의 경우 외부인 등록을 이용하시기 바랍니다.
          </p>
        </div>
      )}
    </>
  );
};

export default SearchResult;
