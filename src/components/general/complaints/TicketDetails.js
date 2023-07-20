import { View, Text } from "react-native";
import React from "react";
import { Divider, Input } from "@rneui/themed";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import { getDate, getTime } from "../../../utils/daysAgo";
import { useSelector } from "react-redux";
import { useState } from "react";
import { showToast } from "../../../utils/toast";
import axiosInstance from "../../../utils/interceptor"

export default function TicketDetails({ navigation, ticket }) {
    const [ticketDetails, setTicketDetails] = useState(ticket);
  const { user } = useSelector((user) => user.auth);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const sendMessageHandler = async () => {
    setIsLoading(true);
    try {
      if (message.trim().length === 0) throw new Error("Message cannot be empty!");
      if (message.trim().length > 200)
        throw new Error("Message cannot be more than 200 characters!");

      await axiosInstance.post("/complaints/message/" + ticketDetails._id, {
        message,
      });

      if (!ticketDetails.isActive) ticketDetails.isActive = true;
      ticketDetails.messages = [
        ...ticketDetails.messages,
        {
          message: message,
          sentBy: user._id,
          createdAt: new Date(),
        },
      ]
      setTicketDetails({...ticketDetails});
      setIsLoading(false);
      setMessage("");
      showToast("Message sent successfully!", "success");
    } catch (err) {
        console.log(err)
      setIsLoading(false);
      if (err.response) return showToast(err.response.data.message, "error");
      showToast(err.message, "error");
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#E7D6FD",
        padding: 10,
        gap: 10,
      }}>
      <View
        style={{
          backgroundColor: "#fff",
          borderRadius: 6,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 20,
        }}>
        <View>
          <Text
            style={{
              textAlign: "center",
              fontWeight: "700",
            }}>
            Ticket Id :
          </Text>
          <Text style={{ fontWeight: "600" }}>{ticketDetails.ticketId}</Text>
        </View>

        <View>
          <Text
            style={{
              textAlign: "center",
              fontWeight: "700",
            }}>
            Date :
          </Text>
          <Text style={{ fontWeight: "600" }}>{getDate(ticketDetails.createdAt)}</Text>
        </View>
      </View>

      <View
        style={{
          flex: 1,
          backgroundColor: "#fff",
          padding: 20,
          borderRadius: 10,
          gap: 6,
        }}>
        <View style={{ gap: 6 }}>
          <View
            style={{
              backgroundColor: "#33056F",
              borderRadius: 10,
              height: 40,
              justifyContent: "center",
              alignItems: "center",
            }}>
            <Text
              style={{
                color: "#fff",
                fontWeight: "700",
                fontSize: 16,
              }}>
              {ticketDetails.isActive ? "OPEN" : "CLOSED"}
            </Text>
          </View>

          <View>
            <Text style={{ fontWeight: "700" }}>Issue :</Text>
            <Text
              style={{
                fontWeight: "700",
                fontSize: 16,
                flexWrap: "wrap",
              }}>
              {ticketDetails.subject}
            </Text>
          </View>
        </View>

        <View
          style={{
            backgroundColor: "#E7D6FD",
            flex: 1,
            borderRadius: 6,
          }}>
          <View style={{ padding: 10, flex: 1 }}>
            {ticketDetails.messages.map((message, index) => {
              return (
                <View
                  key={index}
                  style={{
                    flexDirection: `${
                      message?.sentBy === user?._id ? "row-reverse" : "row"
                    }`,
                  }}>
                  <View
                    style={{
                      padding: 10,
                      backgroundColor: "#fff",
                      borderRadius: 6,
                      width: 230,
                    }}>
                    <View
                      style={{
                        flexDirection: `${
                          message?.sentBy === user?.id ? "row-reverse" : "row"
                        }`,
                        gap: 10,
                        paddingHorizontal: 10,
                        paddingBottom: 4,
                        alignItems: "flex-end",
                      }}>
                      <Text
                        style={{
                          fontWeight: "700",
                          textTransform: "capitalize",
                          fontSize: 16,
                        }}>
                        {message.sentBy === user._id ? "You" : "Support Team"}
                      </Text>
                      <Text
                        style={{
                          fontWeight: "600",
                          fontSize: 12,
                        }}>
                        {getTime(message.createdAt)}
                      </Text>
                    </View>
                    <Divider
                      width={2}
                      color='#33056F'
                      style={{ marginBottom: 10 }}
                    />
                    <Text>{message.message}</Text>
                  </View>
                </View>
              );
            })}
          </View>
          <View
            style={{
              backgroundColor: "#33056F",
              flexDirection: "row",
              alignItems: "center",
              padding: 10,
            }}>
            <View
              style={{
                height: 40,
                flex: 1,
                backgroundColor: "#fff",
                borderRadius: 6,
              }}>
              <Input
                containerStyle={{ flex: 1 }}
                value={message}
                onChangeText={(val) => setMessage(val)}
              />
            </View>
            <View
              style={{
                minWidth: 40,
                justifyContent: "center",
                alignItems: "center",
              }}>
              <FontAwesomeIcon
                name='send'
                size={22}
                color={"#fff"}
                disabled={isLoading}
                onPress={sendMessageHandler}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
