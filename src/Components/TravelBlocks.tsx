import React from 'react'
import { Card } from 'antd';
import { Travels } from '../Interface/Travel';
import { Link } from 'react-router-dom';

//total nem ertem a travels-nek mi a baja

const TravelBlocks: React.FC<Travels>= ({travels}) => {
    

  return (
    <div className='travel-list'>
      {travels.map((travel) => (
            <div className="site-card-border-less-wrapper" key={travel.id}>
                <Link to={`/travels/${travel.id}`} />
                <Card title={travel.title} bordered={false} style={{ width: 300 }}>
                    <h4>{travel.country}</h4>
                    <h4>{travel.location}</h4>
                    <h4>{travel.description}</h4>
                    <h4>{travel.date}</h4>
                    <h5>{travel.author}</h5>
                </Card>
            </div>

        ))}
    </div>
);
}

export default TravelBlocks