import React, { useRef } from 'react';
import { useSnapshot } from 'valtio';
import { setMany } from 'idb-keyval';
import Download from '@/assets/images/icons/download.svg?react';
import Upload from '@/assets/images/icons/upload.svg?react';
import {
  AccountLimitedSetSelection,
  AccountLimitedCardSelection,
  Modal,
  ButtonIconed,
} from '@/components';
import { limitedFullStore, useApp } from '@/context';

const AccountLimitedModal = ({ setShow }) => {
  const { setLimitedFormat } = useApp();
  const limitedAllowedCrypt = useSnapshot(limitedFullStore).allowed.crypt;
  const limitedAllowedLibrary = useSnapshot(limitedFullStore).allowed.library;
  const limitedBannedCrypt = useSnapshot(limitedFullStore).banned.crypt;
  const limitedBannedLibrary = useSnapshot(limitedFullStore).banned.library;
  const limitedSets = useSnapshot(limitedFullStore).sets;
  const fileInput = useRef();

  const handleFileInputClick = () => {
    fileInput.current.click();
  };

  const importFormat = (fileInput) => {
    const reader = new FileReader();
    const file = fileInput.current.files[0];
    reader.readAsText(file);
    reader.onload = async () => {
      const formatText = reader.result;
      const f = JSON.parse(formatText);

      setLimitedFormat(
        f.allowed.crypt,
        f.allowed.library,
        f.banned.crypt,
        f.banned.library,
        f.sets,
      );

      setMany([
        ['limitedAllowedCrypt', f.allowed.crypt],
        ['limitedAllowedLibrary', f.allowed.library],
        ['limitedBannedCrypt', f.banned.crypt],
        ['limitedBannedLibrary', f.banned.library],
        ['limitedSets', f.sets],
      ]);
    };
  };

  const minifyFormat = () => {
    const minified = {
      sets: limitedSets,
      allowed: {
        crypt: {},
        library: {},
      },
      banned: {
        crypt: {},
        library: {},
      },
    };
    Object.keys(limitedAllowedCrypt).map((c) => {
      minified.allowed.crypt[c] = true;
    });
    Object.keys(limitedAllowedLibrary).map((c) => {
      minified.allowed.library[c] = true;
    });
    Object.keys(limitedBannedCrypt).map((c) => {
      minified.banned.crypt[c] = true;
    });
    Object.keys(limitedBannedLibrary).map((c) => {
      minified.banned.library[c] = true;
    });
    return minified;
  };

  const exportFormat = async () => {
    let { saveAs } = await import('file-saver');
    const fileName = `Limited Format [${
      new Date().toISOString().split('T')[0]
    }].txt`;
    const formatText = JSON.stringify(minifyFormat(), null, '  ');
    const file = new File([formatText], fileName, {
      type: 'text/plain;charset=utf-8',
    });
    saveAs(file, fileName);
  };

  return (
    <Modal
      handleClose={() => setShow(false)}
      size="lg"
      title="Manage Limited Format"
    >
      <div className="flex flex-col gap-5">
        <AccountLimitedSetSelection />
        <AccountLimitedCardSelection />
        <AccountLimitedCardSelection inBanned />
        <div className="flex justify-end gap-2">
          <ButtonIconed
            variant="primary"
            onClick={handleFileInputClick}
            title="Import Format"
            icon={<Upload />}
            text="Import Format"
          />

          <ButtonIconed
            variant="primary"
            onClick={exportFormat}
            title="Export Format"
            icon={<Download />}
            text="Export Format"
          />
        </div>
      </div>
      <input
        ref={fileInput}
        accept=".txt"
        type="file"
        onChange={() => importFormat(fileInput)}
        style={{ display: 'none' }}
      />
    </Modal>
  );
};

export default AccountLimitedModal;
