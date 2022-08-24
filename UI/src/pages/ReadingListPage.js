import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { postRequest } from "../axios";
import { useAuth } from "../contextPage/Context";
import { fireBaseAuth } from "../util/firebase";
import ReadingListCard from "../components/ReadingListCard";

// mui
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
function ReadingListPage() {
  const [readingLists, setReasingLists] = useState([]);
  console.log(readingLists);
  const pointer = { cursor: "pointer" };

  const readingList = async () => {
    try {
      const { data } = await postRequest("getUserReadingList", {
        uid: fireBaseAuth.currentUser?.uid,
      });
      setReasingLists(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    readingList();
  }, []);
  return (
    <div className="readingList_main" style={pointer}>
      <Container>
        <Navbar />
      </Container>
      <Container maxWidth="lg">
        <Typography
          variant="h5"
          color="black"
          sx={{
            ml: 20,
            mb: 2,
            fontSize: 30,
            fontWeight: "bold",
            letterSpacing: 1,
          }}
        >
          Reading list (1)
        </Typography>
        <div className=" readingList_body">
          <div className="redingList_cards">
            {readingLists.map((item) => (
              <ReadingListCard
                key={item.postId}
                title={item.title}
                tag={item.tags}
                postId={item.postId}
              />
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}

export default ReadingListPage;
