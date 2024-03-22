import React, { useState } from 'react';
import Download from '@/assets/images/icons/download.svg?react';
import InboxesFill from '@/assets/images/icons/inboxes-fill.svg?react';
import {
  CardImage,
  FlexGapped,
  ButtonIconed,
  Modal,
  PlaytestReportExport,
} from '@/components';
import { playtestServices } from '@/services';

const PlaytestReportExportButton = ({ card, isPrecon = false }) => {
  const [show, setShow] = useState();

  const exportReports = async () => {
    const result = await playtestServices.getReports(card, isPrecon);

    let exportText = '';
    Object.keys(result).forEach((id, idx) => {
      exportText += `User: <${id}>\n`;
      exportText += `Score: ${result[id].score}\n`;
      exportText += `${result[id].text}\n`;
      if (idx + 1 < Object.keys(result).length) {
        exportText += '\n-----\n\n';
      }
    });

    const file = new File([exportText], `${card.Name}.txt`, {
      type: 'text/plain;charset=utf-8',
    });

    let { saveAs } = await import('file-saver');
    saveAs(file, name);
  };

  return (
    <>
      <ButtonIconed
        onClick={() => setShow(true)}
        title="Show Playtest Reports"
        text="Reports"
        icon={<InboxesFill />}
      />
      {show && (
        <Modal
          size="cardPlus"
          title="Playtest Report"
          handleClose={() => setShow(false)}
        >
          <FlexGapped className="max-sm:flex-col">
            <div className="flex flex-col gap-2 sm:gap-4">
              <CardImage card={card} onClick={() => setShow(false)} />
              <ButtonIconed
                onClick={() => exportReports()}
                title="Save Reports"
                text="Save Reports"
                icon={<Download />}
              />
            </div>
            <PlaytestReportExport id={card.Id} isPrecon={isPrecon} />
          </FlexGapped>
        </Modal>
      )}
    </>
  );
};

export default PlaytestReportExportButton;
