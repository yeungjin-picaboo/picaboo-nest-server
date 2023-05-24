function returnMsg(ok: boolean, message: string, error?: Error) {
  const result = {
    ok,
    message
  };

  if (error) {
    result['errorMsg'] = error;
  }

  return result;
}

export { returnMsg };
