import Mock from "mockjs";

const Random = Mock.Random;

Mock.mock(`${process.env.API_URL}/user/login`, "post", data => {
  const info = JSON.parse(data.body);

  if (info.username == "rasello" && info.password == "rasello") {
    return {
      code: 200,
      message: "LOGIN SUCCESSFUL",
      data: {
        accessToken:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
        refreshToken:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
        expiresAt: 100000
      }
    };
  } else {
    return {
      code: 401,
      message: "LOGIN FAILED"
    };
  }
});
Mock.mock(`${process.env.API_URL}/auth/me`, "get", data => {
  return {
    code: 200,
    data: {
      first_name: "Razeena",
      last_name: "Shrestha",
      email: "sanjay@rasello.com",
      username: "rasello",
      created_at: "2021-10-01T12:03:44.539Z",
      updated_at: "2021-10-01T12:03:44.539Z",
      id: 1,
      active: true,
      vaccine_center_id: null,
      roles: [
        {
          id: 1,
          name: "super_admin",
          created_at: "2021-10-22T11:49:05.597Z",
          updated_at: "2021-10-22T11:49:05.597Z"
        }
      ],
      permission: []
    }
  };
});
Mock.mock("http://localhost:8082/v1/users", "get", data => {
  return [];
});
