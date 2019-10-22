export function handleErrorModel(error: any) {
  if (!error.errors) {
    return null;
  }

  const handler: Array<any> = [];
  Object.keys(error.errors).forEach(errorKey => {
    const { message, name, kind } = error.errors[errorKey];
    handler.push({
      message: message.replace('Path', 'Field'),
      type: name,
      kind
    });
  });

  return handler;
}

export default handleErrorModel;
