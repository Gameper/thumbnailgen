import React, { useState, useEffect, useCallback } from 'react';
interface IProps {
    handleChangeFile: (event: React.ChangeEvent<HTMLInputElement>) => (any);
    downloadUrl: string;
}

const Upload: React.FC<IProps> = ({ handleChangeFile, downloadUrl }) => {

    return (
        <div>
            <input type="file" onChange={handleChangeFile} />
        </div>
    )
}

export default Upload;