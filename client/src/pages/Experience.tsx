import React from 'react';
import { motion } from 'framer-motion';
import { FaBriefcase, FaCloud, FaCodeBranch, FaDatabase } from 'react-icons/fa';

interface TimelineItem {
  type: 'experience';
  title: string;
  subtitle: string;
  date: string;
  description: string;
  icon: React.ReactNode;
}

const timeline: TimelineItem[] = [
  {
    type: 'experience',
    title: 'Senior Cloud Engineer',
    subtitle: 'Innovate Cloud Solutions',
    date: 'Jan 2023 - Present',
    description: 'Designing and implementing scalable cloud infrastructure on AWS, focusing on serverless architectures and cost optimization. Leading migration projects and ensuring high availability.',
    icon: <FaCloud />,
  },
  {
    type: 'experience',
    title: 'Data Scientist',
    subtitle: 'Global Data Insights',
    date: 'Jun 2021 - Dec 2022',
    description: 'Developed predictive models and machine learning pipelines to extract actionable insights from large datasets. Collaborated with business teams to define data strategies.',
    icon: <FaDatabase />,
  },
  {
    type: 'experience',
    title: 'DevOps Specialist',
    subtitle: 'Agile Tech Co.',
    date: 'Mar 2020 - May 2021',
    description: 'Automated CI/CD processes, managed containerized applications with Kubernetes, and implemented infrastructure as code using Terraform.',
    icon: <FaCodeBranch />,
  },
  {
    type: 'experience',
    title: 'Software Developer',
    subtitle: 'Startup X',
    date: 'Jan 2018 - Feb 2020',
    description: 'Full-stack development of a SaaS platform using Node.js, React, and MongoDB. Contributed to all phases of the software development lifecycle.',
    icon: <FaBriefcase />,
  },
];

const Experience: React.FC = () => {
  return (
    <section className="container py-16">
      <h2 className="text-4xl font-bold text-center mb-12">Experience</h2>
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

export default Experience;
