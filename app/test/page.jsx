"use client";

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { firestore } from "../firebase/client";
import { useRecoilState } from "recoil";
import { testData, testLoading } from "../atoms/testState";
import {
  Button,
  Center,
  HStack,
  Input,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";

let count = 0;

function page() {
  const [testDataValue, setTestData] = useRecoilState(testData);
  const [testLoadingValue, setTestLoading] = useRecoilState(testLoading);
  const ref = useRef("");
  const ref2 = useRef("");
  count++;

  const [otherData, setOtherData] = useState(null);
  const [otherLoading, setOtherLoading] = useState(true);

  const onAdd = async () => {
    await addDoc(collection(firestore, "tests"), { name: ref.current.value });
  };
  const onAddOther = async () => {
    await addDoc(collection(firestore, "others"), { data: ref2.current.value });
  };

  const onDelete = async (id) => {
    await deleteDoc(doc(firestore, "tests", id));
  };

  const onDelete2 = async (id) => {
    await deleteDoc(doc(firestore, "others", id));
  };

  useEffect(() => {
    console.log("mounted");
    const unsubscribe = onSnapshot(
      query(collection(firestore, "tests"), orderBy("name", "asc")),
      (querySnapshot) => {
        if (!testDataValue) {
          const data = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          setTestData(data);
          setTestLoading(false);
        }
      },
      (err) => {
        console.log(err);
        setTestLoading(false);
      }
    );

    onSnapshot(
      query(collection(firestore, "others"), orderBy("data", "asc")),
      (querySnapshot) => {
        if (!otherData) {
          const data = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          setOtherData(data);
          setOtherLoading(false);
        }
      },
      (err) => {
        console.log(err);
        setOtherLoading(false);
      }
    );

    // return () => {
    //   console.log("unmounted");
    //   unsubscribe();
    // };
  }, []);

  console.log(otherData);

  if (testLoadingValue === true || otherLoading === true) {
    return (
      <Center height={"100vh"}>
        <Spinner></Spinner>
      </Center>
    );
  }

  return (
    <Center height={"100vh"}>
      <VStack>
        {" "}
        {testDataValue.map((doc) => (
          <HStack key={doc.id}>
            <Text>{doc.name}</Text>
            <Button onClick={() => onDelete(doc.id)}>DELETE</Button>
          </HStack>
        ))}
        <hr></hr>
        {otherData.map((doc) => (
          <HStack key={doc.id}>
            <Text>{doc.data}</Text>
            <Button onClick={() => onDelete2(doc.id)}>DELETE2</Button>
          </HStack>
        ))}
        <HStack>
          <Input ref={ref} placeholder="enter new data"></Input>
          <Button onClick={onAdd}>SUBMIT</Button>
        </HStack>
        <HStack>
          <Input ref={ref2} placeholder="enter new data"></Input>
          <Button onClick={onAddOther}>SUBMIT2</Button>
        </HStack>
        <Text>{count}</Text>
        <Link href={"/"}>HOME</Link>
      </VStack>
    </Center>
  );
}

export default page;
