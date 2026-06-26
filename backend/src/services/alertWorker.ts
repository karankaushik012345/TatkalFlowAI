import { Queue, Worker, Job } from 'bullmq';
import { io } from '../index';

const connection = {
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379')
};

// Queue for Tatkal scheduling
export const alertQueue = new Queue('tatkal-alerts', { connection });

// Worker processing the jobs
const worker = new Worker('tatkal-alerts', async (job: Job) => {
  const { userId, templateId, message } = job.data;
  
  // Real-time notification via Socket.io
  io.to(userId).emit('TATKAL_ALERT', {
    templateId,
    message,
    timestamp: new Date()
  });

  // TODO: Trigger MSG91 SMS here

}, { connection });

worker.on('completed', (job) => {
  console.log(`Job ${job.id} completed successfully`);
});

worker.on('failed', (job, err) => {
  console.log(`Job ${job?.id} failed with error ${err.message}`);
});
