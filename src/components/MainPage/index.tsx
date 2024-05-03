import styled from 'styled-components';
import { useGameContents } from '../../hooks/useGameContents';

const Container = styled.div({
  display: 'flex',
  flex: 1,
  flexDirection: 'row',
});

//오늘의 섬
const IslandSection = styled.div({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  justifyContent: 'left', // 수평 중앙 정렬
  alignItems: 'left', // 수직 중앙 정렬
});

const Island = styled.div`
  display: flex;
  flex-direction: row;
  color: ${props => props.theme.colors.btnFontColor};
  justify-content: left;
  align-items: center;
  margin-left: 40px;
`;
const IslandIconSpan = styled.span({
  width: '100px',
});
const IslandNameSpan = styled.span({
  width: '150px',
});
const IslandStartTimesSpan = styled.span({
  width: '100px',
});
const IslandRewardsSpan = styled.span({
  display: 'flex',
});
//오늘의 섬 end

//카오스게이트
const ChaosGateSection = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  font-size: 20px;
  color: ${props => props.theme.colors.btnFontColor};
`;
//카오스게이트 End

//필드보스
const FieldBossSection = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  font-size: 20px;
  color: ${props => props.theme.colors.btnFontColor};
`;
//필도보스 End

export const MainPage = () => {
  const { data, isLoading } = useGameContents();
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1 < 10 ? '0' : '') + (today.getMonth() + 1);
  const day = (today.getDate() < 10 ? '0' : '') + today.getDate();
  const formattedToday = `${year}-${month}-${day}`;

  if (isLoading) {
    return <div>isLoading...</div>;
  }

  const chaosGateData =
    data &&
    data.filter(
      (d: any) =>
        d.CategoryName === '카오스게이트' &&
        d.StartTimes.some((startTime: string) => {
          const startTimeDate = new Date(startTime);
          const offset = new Date().getTimezoneOffset() * 60000;
          const formattedStartTime = new Date(startTimeDate.getTime() - offset);
          return (
            formattedStartTime.toISOString().split('T')[0] === formattedToday &&
            parseInt(formattedStartTime.toISOString().split('T')[1].split(':')[0]) > 6
          );
        })
    );
  const fieldBossData =
    data &&
    data.filter(
      (d: any) =>
        d.CategoryName === '필드보스' &&
        d.StartTimes.some((startTime: string) => {
          const startTimeDate = new Date(startTime);
          const offset = new Date().getTimezoneOffset() * 60000;
          const formattedStartTime = new Date(startTimeDate.getTime() - offset);
          return (
            formattedStartTime.toISOString().split('T')[0] === formattedToday &&
            parseInt(formattedStartTime.toISOString().split('T')[1].split(':')[0]) > 6
          );
        })
    );

  return (
    <Container>
      {/* 오늘의 섬 */}
      <IslandSection>
        {!data
          ? '데이터를 불러오는데 실패하였습니다'
          : data
              .filter((d: any) => d.CategoryName === '모험 섬')
              .map((d: any, i: number) => {
                return (
                  <Island key={i}>
                    <IslandIconSpan>
                      <img src={d.ContentsIcon} />
                    </IslandIconSpan>
                    <IslandNameSpan>{d.ContentsName}</IslandNameSpan>
                    <IslandStartTimesSpan>
                      {d.StartTimes.map((d: string, i: number) => {
                        return (
                          <div key={i}>{d.split('T')[0] === formattedToday && d.split('T')[1]}</div>
                        );
                      })}
                    </IslandStartTimesSpan>
                    <IslandRewardsSpan>
                      {d.RewardItems.map((rewardItem: any, i: number) => {
                        const isToday =
                          rewardItem.StartTimes &&
                          rewardItem.StartTimes.some((startTime: any) => {
                            const startTimeDate = new Date(startTime).toISOString().split('T')[0];
                            return startTimeDate === formattedToday;
                          });
                        if (isToday) {
                          return (
                            <div key={i}>
                              <img
                                style={{ width: '50px', height: '50px' }}
                                src={rewardItem.Icon}
                                alt={rewardItem.Name}
                              />
                            </div>
                          );
                        }
                      })}
                    </IslandRewardsSpan>
                  </Island>
                );
              })}
      </IslandSection>
      {/* 오늘의 섬 end */}
      {/* 카오스게이트 */}
      <ChaosGateSection>
        <p>카오스게이트</p>
        {!data
          ? '데이터를 불러오는데 실패하였습니다'
          : chaosGateData.length > 0
            ? '등장'
            : '안등장'}
      </ChaosGateSection>
      {/* 카오스게이트 end */}
      {/* 필드보스 */}
      <FieldBossSection>
        <p>필드보스</p>
        {!data
          ? '데이터를 불러오는데 실패하였습니다'
          : fieldBossData.length > 0
            ? '등장'
            : '안등장'}
      </FieldBossSection>
      {/* 필드보스 end */}
    </Container>
  );
};
