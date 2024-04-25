import React, { useState } from 'react';
import axios from 'axios';

function DocxEditor() {
    const [docxContent, setDocxContent] = useState('');
    const [editedContent, setEditedContent] = useState('');
    const [docxData, setDocxData] = useState(null);

    const renderDocx = async () => {
        try {
            // Assume 'docxData' contains the binary data of the DOCX file
            const response = await axios.post('https://localhost:7138/api/Form/render', { docxData });
            setDocxContent(response.data.html);
        } catch (error) {
            console.error('Error rendering DOCX:', error);
        }
    };

    const saveDocx = async () => {
        try {
            // Save edited HTML content back to DOCX
            const response = await axios.post('https://localhost:7138/api/Form/save', editedContent);
            // Assume 'updatedDocxData' contains the binary data of the updated DOCX file
            const updatedDocxData = response.data.docxData;
            // Now you can save or download the updated DOCX file
        } catch (error) {
            console.error('Error saving DOCX:', error);
        }
    };

    return (
        <div>
            <button onClick={renderDocx}>Render DOCX</button>
            <div dangerouslySetInnerHTML={{ __html: docxContent }} />
            <textarea value={editedContent} onChange={(e) => setEditedContent(e.target.value)} />
            <button onClick={saveDocx}>Save DOCX</button>
        </div>
    );
}

export default DocxEditor;
