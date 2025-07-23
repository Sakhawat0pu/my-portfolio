import React from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaBrain } from 'react-icons/fa';

interface TimelineItem {
  type: 'education';
  title: string;
  subtitle: string;
  date: string;
  description: string;
  icon: React.ReactNode;
}

const timeline: TimelineItem[] = [
  {
    type: 'education',
    title: 'Ph.D. in Artificial Intelligence',
    subtitle: 'Stanford University',
    date: 'Sep 2021 - Dec 2024 (Expected)',
    description: 'Researching novel deep learning architectures for natural language understanding. Published several papers in top-tier AI conferences.',
    icon: <FaBrain />,
  },
  {
    type: 'education',
    title: 'Master of Science in Computer Science',
    subtitle: 'University of California, Berkeley',
    date: 'Sep 2019 - May 2020',
    description: 'Focused on advanced algorithms, distributed systems, and software engineering principles. GPA: 3.9/4.0.',
    icon: <FaGraduationCap />,
  },
  {
    type: 'education',
    title: 'Bachelor of Engineering in Computer Science',
    subtitle: 'Georgia Institute of Technology',
    date: 'Sep 2014 - May 2018',
    description: 'Graduated with honors. Participated in competitive programming and developed several open-source projects.',
    icon: <FaGraduationCap />,
  },
];

const Education: React.FC = () => {
  return (
    <section className="container py-16">
      <h2 className="text-4xl font-bold text-center mb-12">Education</h2>
      <div className="relative wrap overflow-hidden p-10 h-full">
        {/* Vertical line */}
        <div className="border-2 border-primary absolute h-full border-opacity-50" style={{ left: '50%', transform: 'translateX(-50%)' }}></div>

        {timeline.map((item, index) => (
          <motion.div
            key={index}
            className={`mb-8 flex justify-between items-center w-full ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
          >
            {/* Empty div for spacing on one side */}
            <div className="order-1 w-5/12"></div>

            {/* Icon Circle */}
            <div className="z-20 flex items-center order-1 bg-primary shadow-xl w-12 h-12 rounded-full justify-center text-white text-2xl flex-shrink-0">
              {item.icon}
            </div>

            {/* Content Card */}
            <div className={`order-1 bg-base-200 rounded-lg shadow-xl w-5/12 px-6 py-4 transform transition-all duration-300 hover:scale-105 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
              <h3 className="mb-2 font-bold text-xl text-primary">{item.title}</h3>
              <p className="text-sm text-base-content opacity-80 mb-1">{item.subtitle}</p>
              <p className="text-xs text-gray-500 mb-2">{item.date}</p>
              <p className="text-sm leading-snug tracking-wide text-base-content">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Education;
