import React, { useState } from 'react';
import { sendMessage } from '../services/api';
import { FaEnvelope, FaLinkedin, FaGithub } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await sendMessage(formData);
      const toast = document.createElement('div');
      toast.className = 'toast toast-top toast-center';
      toast.innerHTML = '<div class="alert alert-success"><span>Message sent successfully!</span></div>';
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 3000); // Remove toast after 3 seconds
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error("Error sending message:", error);
      const toast = document.createElement('div');
      toast.className = 'toast toast-top toast-center';
      toast.innerHTML = '<div class="alert alert-error"><span>Failed to send message.</span></div>';
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 3000); // Remove toast after 3 seconds
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section className="container py-16">
      <h2 className="text-4xl font-bold text-center mb-12">Get In Touch</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <motion.div
          className="bg-base-200 p-8 rounded-lg shadow-xl"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-2xl font-bold mb-6">Send me a message</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="label"><span className="label-text">Name</span></label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="input input-bordered w-full" required />
            </div>
            <div>
              <label htmlFor="email" className="label"><span className="label-text">Email</span></label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="input input-bordered w-full" required />
            </div>
            <div>
              <label htmlFor="message" className="label"><span className="label-text">Message</span></label>
              <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows={6} className="textarea textarea-bordered w-full"></textarea>
            </div>
            <button type="submit" className="btn btn-primary w-full">Send Message</button>
          </form>
        </motion.div>

        <motion.div
          className="bg-base-200 p-8 rounded-lg shadow-xl"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-2xl font-bold mb-6">Connect with me</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <FaEnvelope size={24} className="text-primary" />
              <span>your.email@example.com</span>
            </div>
            <div className="flex items-center space-x-4">
              <FaLinkedin size={24} className="text-primary" />
              <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" className="link link-hover">LinkedIn Profile</a>
            </div>
            <div className="flex items-center space-x-4">
              <FaGithub size={24} className="text-primary" />
              <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="link link-hover">GitHub Profile</a>
            </div>
          </div>
          {/* Optional: Google Maps or location hint */}
          <div className="mt-8">
            <h4 className="text-xl font-bold mb-4">Location</h4>
            <p>Based in [Your City, Your Country]</p>
            {/* <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1dYOUR_LATITUDE!2dYOUR_LONGITUDE!3dYOUR_ZOOM!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDQwJzQ5LjkiTiA3N8KwMDAnMjQuMCJF!5e0!3m2!1sen!2sus!4v1678901234567!5m2!1sen!2sus"
              width="100%"
              height="200"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe> */}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
