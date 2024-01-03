import React, { useState } from 'react';
import { useSelector } from 'react-redux';  
import useApiPrivate from '../hooks/useAPIPrivate';  

const SubmitReview = () => {
    const apiPrivate = useApiPrivate(); 
    const [reviewContent, setReviewContent] = useState('');
    const [submitStatus, setSubmitStatus] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await apiPrivate.post('/reviews', { content: reviewContent });
            if (response.status === 201) {
                setSubmitStatus('Review submitted successfully.');
                setReviewContent('');
            } else {
                setSubmitStatus('Failed to submit review.');
            }
        } catch (error) {
            setSubmitStatus('Error submitting review.');
        }
    };

    return (
        <div>
            <h1>Submit Review</h1>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={reviewContent}
                    onChange={(e) => setReviewContent(e.target.value)}
                    placeholder="Write your review..."
                />
                <button type="submit">Submit Review</button>
            </form>
            <p>Status: {submitStatus}</p>
        </div>
    );
};

export default SubmitReview;
