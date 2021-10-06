export const listUser = async () => {
  var myHeaders = new Headers();
  myHeaders.append("AuthToken", "UrM4YHgb1FcqEf1tuKwmAMMX5MxFZ12a");

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  const response = await fetch(
    "https://devza.com/tests/tasks/listusers",
    requestOptions
  );
  const data = await response.json();
  console.log(data);
  return data;
};
