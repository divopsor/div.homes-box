'use client';

import axios from "axios";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { Container } from "../components/ui/Container";
import { Stack } from "../components/ui/Stack";
import { AuthContext } from "../providers";

export default function AdminPage () {
  const router = useRouter();
  const [id, setId] = useState<string>();
  const [pw, setPw] = useState<string>();
  const auth = useContext(AuthContext);

  useEffect(() => {
    if (auth) {
      return;
    }

    router.push('/');
  }, [auth]);

  return (
    <main>
      <Container width={720}>
      <Stack.Vertical align="center">
        <Stack.Vertical align="right">
          <input type="text" id="id" value={id} onChange={(e) => setId(e.target.value)}></input>
          <br />
          <input type="password" id="password" value={pw} onChange={(e) => setPw(e.target.value)}></input>
          <br />
          <button onClick={async () => {
            await axios.post(`/api/gist/login`, { id, password: pw });
            router.push('/');
          }}>로그인</button>
        </Stack.Vertical>
      </Stack.Vertical>
      </Container>
    </main>
  );
};
