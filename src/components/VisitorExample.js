// src/components/ChatbotSection.js
import { useState, useEffect} from 'react';
import './VisitorExample.css';

const example = [
  {"time": "2 hours", "city": "Juneau", "interest": "local food", "transport": "on bike"},
  {"time": "4 hours", "city": "Kotzebue", "interest": "nature", "transport": "on foot"},
  {"time": "1 day", "city": "Anchorage", "interest": "history", "transport": "via car"},
]

function VisitorExample() {
  const [ exampleIdx, setExampleIdx] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      const newIdx = (exampleIdx + 1) % example.length
      setExampleIdx(newIdx)
    }, 3000);
  }, [exampleIdx])

  return (
    <section className="visitorExample">
      <h2>Personalized Tours</h2>
      <p> Pull up Local Loop's site, answer a few questions, and have a personalized tour created for them in seconds.</p>
      <p className='visitorExampleText'>
                I have <span>{example[exampleIdx].time}</span> in <span>{example[exampleIdx].city}</span>.<br/><br/>
                I'm interested in <span>{example[exampleIdx].interest}</span> and am traveling <span>{example[exampleIdx].transport}</span>.
            </p>
    </section>
  );
}

export default VisitorExample;