'use client';

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Container } from "../components/ui/Container";
import { Stack } from "../components/ui/Stack";

export default function AdminPage () {
  const router = useRouter();
  const [id, setId] = useState<string>();
  const [pw, setPw] = useState<string>();

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
            router.back();
          }}>로그인</button>
        </Stack.Vertical>
      </Stack.Vertical>
      </Container>
    </main>
  );
};
