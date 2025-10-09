import styled from 'styled-components';
import { useCharacterProfile } from '../../hooks/useCharacter';
import { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import pLimit from 'p-limit';
import { CharacterProfile } from '../../utils/types';

const Container = styled.div({});

export const GuildCharacterListView = () => {
  //TODO: set Types
  // const { data, isLoading, isError } = useCharacterProfile('고달픈사멸의삶');
  // if (isLoading) return <div>Loading...</div>;
  // if (isError || !data) return <div>Error</div>;
  // console.log('캐릭터 이름: ', data.ArmoryProfile.CharacterName);
  // console.log('직업: ', data.ArmoryProfile.CharacterClassName);
  // console.log('각인: ', data.ArkPassive.Title);
  // console.log('원정대 레벨 : ', data.ArmoryProfile.ExpeditionLevel);
  // console.log('캐릭터 레벨 : ', data.ArmoryProfile.ItemAvgLevel);
  // console.log('전투력 : ', data.ArmoryProfile.CombatPower);
  // data.ArkGrid.Slots.forEach((slot, i) => {
  //   console.log(`코어 ${i + 1}:`, slot.Grade);
  // });
  // console.log('원정대 레벨 : ', data);
  // return <Container></Container>;

  const [members, setMembers] = useState<string[]>([]);
  const [profiles, setProfiles] = useState<CharacterProfile[]>([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0 });

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  useEffect(() => {
    const loadExcel = async () => {
      const res = await fetch('/members.xlsx');
      if (!res.ok) {
        console.error('엑셀 파일을 불러오지 못했습니다.');
        return;
      }

      const buffer = await res.arrayBuffer();
      const workbook = XLSX.read(buffer, { type: 'array' });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const rows: any[] = XLSX.utils.sheet_to_json(sheet);
      const names = rows.map(row => row.name).filter(Boolean);

      console.log('엑셀에서 읽은 캐릭터 수:', names.length);
      setMembers(names);
      setProgress({ current: 0, total: names.length });
    };

    loadExcel();
  }, []);

  useEffect(() => {
    if (!members.length) return;

    const fetchProfiles = async () => {
      setLoading(true);
      const results: CharacterProfile[] = [];
      const batchSize = 100;

      for (let i = 0; i < members.length; i += batchSize) {
        const batch = members.slice(i, i + batchSize);

        console.log(`API 호출: ${i + 1} ~ ${i + batch.length}번째 캐릭터`);

        for (let j = 0; j < batch.length; j++) {
          const name = batch[j];
          const url = `https://developer-lostark.game.onstove.com/armories/characters/${encodeURIComponent(
            name
          )}?filters=profiles%2Barkpassive%2Barkgrid`;

          try {
            const req = await fetch(url, {
              headers: {
                'Content-Type': 'application/json',
                authorization: `bearer ${import.meta.env.VITE_APP_API_KEY}`,
              },
            });

            if (!req.ok) {
              console.error(`API 실패: ${name} (${req.status})`);
              results.push(null as any);
            } else {
              const res = await req.json();
              results.push(res);
            }
          } catch (err) {
            console.error(`API 호출 에러: ${name}`, err);
            results.push(null as any);
          }

          setProgress({ current: results.length, total: members.length });
        }

        // 100개 호출 후 1분 대기 (rate limit 준수)
        if (i + batchSize < members.length) {
          console.log('💤 1분 대기 중...');
          await sleep(60 * 1000);
        }
      }

      setProfiles(results);
      setLoading(false);
    };

    fetchProfiles();
  }, [members]);

  if (loading)
    return (
      <div>
        불러오는 중... ({progress.current}/{progress.total})
      </div>
    );

  return (
    <div>
      <h2>길드 캐릭터 프로필 ({profiles.length}명)</h2>
      <div>
        진행 상황: {progress.current} / {progress.total}
      </div>
      {profiles.map((p, idx) => (
        <div key={idx}>
          <strong>{p?.ArmoryProfile?.CharacterName || '불러오기 실패'}</strong> —{' '}
          {p?.ArkGrid?.Slots?.map((slot, i) => <span key={i}>{slot.Grade} </span>)}
        </div>
      ))}
    </div>
  );
};
