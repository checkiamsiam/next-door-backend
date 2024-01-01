import AppError from "../utils/customError.util";

const subscribeToJobs = async () => {
  try {
    // orderStatusJob.start();
  } catch (e) {
    throw new AppError("Error subscribing to jobs", 500);
  }
};

export default subscribeToJobs;
