import { Character } from './types';

const APIKEY =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyIsImtpZCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyJ9.eyJpc3MiOiJodHRwczovL2x1ZHkuZ2FtZS5vbnN0b3ZlLmNvbSIsImF1ZCI6Imh0dHBzOi8vbHVkeS5nYW1lLm9uc3RvdmUuY29tL3Jlc291cmNlcyIsImNsaWVudF9pZCI6IjEwMDAwMDAwMDAzMzQ1NzkifQ.bQ656vskR9DwbkCgGlEmE-MH3tUSQVkkod7aXPwb50N29Vb25XdKaNPbS_r97dnwkqfCJvMpHQxp_mK_UQLdB-bGytVaT8t6DvnkuL_jExMdVtlHVArEuEWnsXc89Tlu0KKisJD-21GMVGxKLY0eEcZQY_0iCOFdpHV5UJ86SDLV_ixuwyoU28rP4t-wnd8hKzphuFlZnP3m5Fw6V00mjzDcDONj4PTEpBKFvfafzE8RV0LzuE_7Oa2h3IYcnGLU29fMBne9OKz5AMvFVdA_lkhN7move2pSPR_Oh4NEReeB1nuWSb-VeVeBn6aihP9EX5NQsvFQXKzDeeXHnEtMyw';

class API {
  async getCharacterInfo(characterName: string) {
    const url = `https://developer-lostark.game.onstove.com/characters/${characterName}/siblings`;
    const req = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', authorization: `bearer ${APIKEY}` },
    });
    const res = await req.json();
    const result = res.map((d: Partial<Character>, i: number) => ({
      ...d,
      key: i,
    }));
    return result;
  }
}

const api = new API();

export default api;
