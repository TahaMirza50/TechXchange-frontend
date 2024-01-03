import React, { useState } from 'react';
import { useSelector } from 'react-redux';  
import useApiPrivate from '../hooks/useAPIPrivate';  

const SubmitReport = () => {
    const apiPrivate = useApiPrivate();  
    const [reportContent, setReportContent] = useState('');
    const [submitStatus, setSubmitStatus] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await apiPrivate.post('/reports', { content: reportContent });
            if (response.status === 201) {
                setSubmitStatus('Report submitted successfully.');
                setReportContent('');
            } else {
                setSubmitStatus('Failed to submit report.');
            }
        } catch (error) {
            setSubmitStatus('Error submitting report.');
        }
    };

    return (
        <div>
            <h1>Submit Report</h1>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={reportContent}
                    onChange={(e) => setReportContent(e.target.value)}
                    placeholder="Describe the issue..."
                />
                <button type="submit">Submit Report</button>
            </form>
            <p>Status: {submitStatus}</p>
        </div>
    );
};

export default SubmitReport;

