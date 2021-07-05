import type { NextApiRequest, NextApiResponse } from 'next';

interface CreateNewAccountParameters {
  username: string;
  password: string;
}

interface BooleanResult {
  result: boolean;
  errors?: Record<string, string>;
}

export default function createNewAccount(req: NextApiRequest, res: NextApiResponse<BooleanResult>) {
  console.log(req.body)
  const { username, password } : CreateNewAccountParameters = JSON.parse(req.body);
  if (!username && !password) {
    res.status(400).json({
      result: false,
      errors: {message: 'Username and password are not valid'}
    })
  } else if (!username) {
    res.status(400).json({
      result: false,
      errors: {message: 'Username is not valid'}
    })
  } else if (!password) {
    res.status(400).json({
      result: false,
      errors: {message : 'Password is not valid'}
    })
  } else {
    res.status(200).json({ result: true });
  }
}
