// tslint:disable:no-console
export const errorApi = (err: string) => {
  if (process.env.NODE_ENV !== 'test') {
    console.error(err);
  }

  return { status: 500, message: 'An internal error occured.' };
};

export const formatResponse = (res: string) => {
  return { status: 400, message: res };
};

export const roomNotFound = () => {
  return { status: 404, message: 'Room not found.' };
};
