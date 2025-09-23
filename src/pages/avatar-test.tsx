import React, { useState } from 'react';
import Avatar from '../components/Avatar/Avatar';
import { Link } from 'react-router-dom';

const AvatarTest: React.FC = () => {
    const [size, setSize] = useState(100);

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>

            <div style={{ marginBottom: '30px' }}>
                <label htmlFor="size-slider" style={{ display: 'block', marginBottom: '10px' }}>
                    크기: {size}px
                </label>
                <input
                    id="size-slider"
                    type="range"
                    min="50"
                    max="300"
                    value={size}
                    onChange={(e) => setSize(Number(e.target.value))}
                    style={{ width: '300px' }}
                />
            </div>

            <div style={{ marginBottom: '40px' }}>
                <h3>기본 이미지 (src 없이)</h3>
                <Avatar size={size} alt="Default avatar" />
            </div>

            <div style={{ marginBottom: '40px' }}>
                <h3>다양한 크기 비교</h3>
                <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
                    <Avatar size={40} />
                    <Avatar size={60} />
                    <Avatar size={80} />
                    <Avatar size={120} />
                    <Avatar size={160} />
                </div>
            </div>

            <Link to="/">
                <button>홈으로 돌아가기</button>
            </Link>
        </div>
    );
};

export default AvatarTest;