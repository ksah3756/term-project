import React, { useState, useEffect } from 'react';
import './styles.css';
import moment from 'moment';

const App = () => {
    // default는 멜론으로
    const [selectedPriority, setSelectedPriority] = useState({
        first: 'melon',
        second: 'melon',
        third: 'melon'
    });
    const [trackList, setTrackList] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const queryString = new URLSearchParams(selectedPriority).toString();
        //console.log(queryString);
        try {
            const res = await fetch(`http://localhost:5000/totalChart/?${queryString}`, {
                method: 'GET',
                headers: { "Content-Type": "application/json" },
            });
            const data = await res.json();
            setTrackList(data);
        } catch (error) {
            console.error('Error sending GET request to the server:', error);
            // 에러 처리
        }
    };

    const handlePriorityChange = (e) => {
        const { name, value } = e.target;
        setSelectedPriority(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <>
            <div class="two alt-two">
                <h1>종합 음원 차트 <div style={{color: "#314de8"}}>top 100</div>
                    <span>차트의 우선순위를 정해주세요.</span>
                </h1>
            </div>
            
            <form className="priority" onSubmit={handleSubmit}>
                <strong>1</strong>
                <input type="radio" name="first" value="melon" onChange={handlePriorityChange} />멜론
                <input type="radio" name="first" value="genie" onChange={handlePriorityChange} />지니
                <input type="radio" name="first" value="bugs" onChange={handlePriorityChange} />벅스
                <br/>
                <strong>2</strong>
                <input type="radio" name="second" value="melon" onChange={handlePriorityChange} />멜론
                <input type="radio" name="second" value="genie" onChange={handlePriorityChange} />지니
                <input type="radio" name="second" value="bugs" onChange={handlePriorityChange} />벅스
                <br/>
                <strong>3</strong>
                <input type="radio" name="third" value="melon" onChange={handlePriorityChange} />멜론
                <input type="radio" name="third" value="genie" onChange={handlePriorityChange} />지니
                <input type="radio" name="third" value="bugs" onChange={handlePriorityChange} />벅스
                <br/><br/>
                <input type="submit" value="종합 차트 보기" style={{backgroundColor:"#8caaf5", font:"sans-serif"}}/>
                <br/><br/>
            </form>

            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ background: '#8caaf5' }}>
                        <th style={{ padding: '8px', border: '1px solid #ddd' }}>순위</th>
                        <th style={{ padding: '8px', border: '1px solid #ddd' }}>곡 제목</th>
                        <th style={{ padding: '8px', border: '1px solid #ddd' }}>아티스트</th>
                    </tr>
                </thead>
                <tbody>
                    {trackList.map((track, index) => (
                        <tr key={index+1} style={{ background: index % 2 === 0 ? '#b9caf0' : '#fff' }}>
                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>{index+1}</td>
                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>{track[0]}</td>
                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>{track[1].artist}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default App;
