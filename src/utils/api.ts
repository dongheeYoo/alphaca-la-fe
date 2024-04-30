import { Character, Group } from './types';
//const END_POINT = `http://localhost:8080/api`;
const END_POINT = `http://115.85.180.49:8080/api`;

class API {
  async getCharacterInfo(characterName: string) {
    const url = `https://developer-lostark.game.onstove.com/characters/${characterName}/siblings`;
    const req = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `bearer ${import.meta.env.VITE_APP_API_KEY}`,
      },
    });
    const res = await req.json();
    const result = res.map((d: Partial<Character>, i: number) => ({
      ...d,
      key: i,
    }));
    return result;
  }

  async getGameContentsInfo() {
    const url = `https://developer-lostark.game.onstove.com/gamecontents/calendar`;
    console.log(import.meta.env.VITE_APP_API_KEY);
    const req = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `bearer ${import.meta.env.VITE_APP_API_KEY}`,
      },
    });
    const res = await req.json();
    return res;
  }

  async getGroups() {
    const url = `${END_POINT}/group`;
    const req = await fetch(url, {
      method: 'GET',
    });
    const res = await req.json();
    return res;
  }

  async postGroup({ data }: { data: any }) {
    const url = `${END_POINT}/group`;
    const req = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data }),
    });
    const res = await req.json();
    return res;
  }

  async updateGroup({ data }: { data: Group }) {
    const url = `${END_POINT}/group/${data._id}`;
    const req = await fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data }),
    });
    const res = await req.json();
    return res;
  }

  async deleteGroup(id: string) {
    const url = `${END_POINT}/group/${id}`;
    const req = await fetch(url, {
      method: 'DELETE',
    });
    const res = await req.json();
    return res;
  }

  async resetDoneGroup() {
    const url = `${END_POINT}/group/reset/done`;
    const req = await fetch(url, {
      method: 'PUT',
    });
    const res = await req.json();
    return res;
  }

  async getCharactersGroupInfo(characterName: string) {
    const url = `${END_POINT}/group/member/info/${characterName}`;
    const req = await fetch(url);
    const res = await req.json();
    return res;
  }
}

const api = new API();

export default api;
