import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnapshot } from 'valtio';
import { read, utils } from 'xlsx';
import Upload from '@/assets/images/icons/upload.svg';
import X from '@/assets/images/icons/x.svg';
import { ButtonIconed } from '@/components';
import {
  setAnalyzeDecks,
  setAnalyzeInfo,
  setAnalyzeResults,
  analyzeStore,
  useApp,
} from '@/context';
import { useDeckImport, useTags } from '@/hooks';

const AnalyzeLoadButton = () => {
  const { cryptCardBase, libraryCardBase } = useApp();
  const info = useSnapshot(analyzeStore).info;
  const [tempDecks, setTempDecks] = useState();
  const navigate = useNavigate();
  const fileInputDecks = useRef();
  const fileInputArchon = useRef();

  const getDeck = async (data) => {
    const deck = await useDeckImport(data, cryptCardBase, libraryCardBase);
    deck.tags = await useTags(deck.crypt, deck.library);
    return deck;
  };

  const loadDecks = async () => {
    const files = fileInputDecks.current.files;
    const decks = Object.keys(files).map(async (i) => {
      const result = await new Promise((resolve) => {
        const file = files[i];
        let fileReader = new FileReader();
        fileReader.onload = () => resolve(getDeck(fileReader.result));
        fileReader.readAsText(file);
      });

      return result;
    });

    Promise.all(decks).then((v) => {
      const d = {};
      v.forEach((i) => {
        d[parseInt(i.author)] = i;
      });

      setTempDecks(d);
    });
  };

  const loadArchon = () => {
    const file = fileInputArchon.current.files[0];
    const reader = new FileReader();
    reader.onload = async () => {
      const wb = read(reader.result);

      const wsInfo = wb.Sheets['Tournament Info'];
      const dataInfo = utils.sheet_to_csv(wsInfo).split('\n');
      const wsScores = wb.Sheets['Methuselahs'];
      const dataScores = utils.sheet_to_csv(wsScores).split('\n');

      let totalGw = 0;
      let totalVp = 0;
      let medianVp = 0;
      let medianGw = 0;
      const totalPlayers = parseInt(dataInfo[9].split(',')[1]);

      dataScores.forEach((n, idx) => {
        if (idx < 6 || n[0] === ',') return;
        const array = n.split(',');
        const veknId = parseInt(array[4]);
        const rank =
          parseInt(array[21]) !== 2 ? parseInt(array[21]) : parseInt(array[18]);

        const score = {
          gw: parseInt(array[7]),
          vp: parseInt(array[8]),
          rank: rank,
          players: totalPlayers,
        };

        if (tempDecks[veknId]) tempDecks[veknId].score = score;

        if (score.rank > Math.ceil(totalPlayers / 2)) {
          if (medianVp < score.vp) medianVp = score.vp;
          if (medianGw < score.gw) medianGw = score.gw;
        }
        totalGw += score.gw;
        totalVp += score.vp;
      });

      const info = {
        name: dataInfo[2].split(',')[1],
        date: dataInfo[3].split(',')[1],
        location: dataInfo[6].split(',')[1],
        players: totalPlayers,
        totalGw: totalGw,
        totalVp: totalVp,
        medianGw: medianGw,
        medianVp: medianVp,
      };

      setAnalyzeInfo(info);
      setAnalyzeDecks(tempDecks);
      setAnalyzeResults(tempDecks);
    };

    reader.readAsArrayBuffer(file);
  };

  const handleClear = () => {
    setTempDecks();
    setAnalyzeResults();
    setAnalyzeDecks();
    setAnalyzeInfo();
    navigate('/tournament_analyze');
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        {!tempDecks ? (
          <ButtonIconed
            className="w-full"
            variant="primary"
            onClick={() => fileInputDecks.current.click()}
            title="Import Decks"
            icon={<Upload />}
            text="Import Decks (.txt)"
          />
        ) : (
          !info && (
            <ButtonIconed
              className="w-full"
              variant="primary"
              onClick={() => fileInputArchon.current.click()}
              title="Import Archon"
              icon={<Upload />}
              text="Import Archon (.xlsx)"
            />
          )
        )}
        <ButtonIconed
          variant="primary"
          onClick={handleClear}
          title="Clear Data"
          icon={<X />}
          text="Clear"
        />
        <input
          multiple
          ref={fileInputDecks}
          accept=".txt"
          type="file"
          onChange={() => loadDecks()}
          style={{ display: 'none' }}
        />
        <input
          ref={fileInputArchon}
          accept=".xlsx"
          type="file"
          onChange={() => loadArchon()}
          style={{ display: 'none' }}
        />
      </div>
    </>
  );
};

export default AnalyzeLoadButton;
