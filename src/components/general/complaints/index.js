import { View, Text } from "react-native";
import React from "react";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { useState } from "react";
import { Button, Dialog, Divider, FAB, Input } from "@rneui/themed";
import axiosInstance from "../../../utils/interceptor";
import { useEffect } from "react";
import { getDate } from "../../../utils/daysAgo"
import { showToast } from "../../../utils/toast";

export default function ComplaintsPanel({ navigation }) {
  const [showAddComplaintForm, setShowAddComplaintForm] = useState(false);
  const [addComplaintData, setAddComplaintData] = useState({})
  const [complaints, setComplaints] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const plusIcon = (
    <MaterialCommunityIcon name='plus' size={22} color={"#fff"} />
  );

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axiosInstance.get("/complaints");
        setComplaints(data.message);
      } catch (err) {
        setComplaints([]);
      }
    })();
  }, []);

  const addComplaintHandler = async () => {
    setIsLoading(true);
    try {
      if (!addComplaintData.message || !addComplaintData.subject)
        throw new Error("Enter all the fields !");

      const { data } = await axiosInstance.post("/complaints", addComplaintData);
      setIsLoading(false);
      setComplaints([...complaints, data.message]);
      setShowAddComplaintForm(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      if (err.response) return showToast(err.response.data.message, "error");
      showToast(err.message, "error");
    }
  }

  return (
    complaints && (
      <>
        <View
          style={{
            padding: 10,
          }}>
          <View style={{ flexDirection: "column-reverse" }}>
            {
              complaints.map((ticket, index)=>{
                return (
                  <View
                    key={index}
                    style={{
                      backgroundColor: "#fff",
                      padding: 10,
                      marginVertical: 10,
                      borderRadius: 6,
                    }}>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}>
                      <View>
                        <Text
                          style={{
                            color: "#33056F",
                            fontWeight: "700",
                            fontSize: 15,
                            flexWrap: "wrap",
                            width: 250,
                            marginBottom: 10,
                          }}>
                          {ticket.subject}
                        </Text>
  
                        <View
                          style={{
                            flexDirection: "row",
                            gap: 10,
                            alignItems: "center",
                          }}>
                          <Text
                            style={{
                              color: "#000",
                              fontWeight: "700",
                              fontSize: 12,
                            }}>
                            Ticket Id :
                          </Text>
                          <Text
                            style={{
                              color: "#000",
                              fontWeight: "700",
                              fontSize: 12,
                            }}>
                            {ticket.ticketId}
                          </Text>
                        </View>
  
                        <View
                          style={{
                            flexDirection: "row",
                            gap: 10,
                            alignItems: "center",
                          }}>
                          <Text
                            style={{
                              color: "#000",
                              fontWeight: "700",
                              fontSize: 12,
                            }}>
                            Ticket Status :
                          </Text>
                          <Text
                            style={{
                              color: "#000",
                              fontWeight: "700",
                              fontSize: 12,
                            }}>
                            {ticket.isActive ? "OPEN" : "CLOSED"}
                          </Text>
                        </View>
                      </View>
  
                      <View>
                        <Button
                          onPress={() =>
                            navigation.navigate("Ticket Details", {
                              ticket: ticket,
                            })
                          }
                          title={"View"}
                          buttonStyle={{
                            backgroundColor: "#F37130",
                            borderRadius: 6,
                            minWidth: 60,
                          }}
                        />
                      </View>
                    </View>
                    <Divider
                      style={{
                        marginVertical: 10,
                      }}
                    />
                    <View
                      style={{
                        flexDirection: "row",
                        gap: 6,
                        alignItems: "center",
                      }}>
                      <Text
                        style={{
                          color: "#000",
                          fontWeight: "700",
                          fontSize: 12,
                        }}>
                        Created At :
                      </Text>
                      <Text
                        style={{
                          color: "#000",
                          fontSize: 12,
                          fontWeight: "700",
                        }}>
                        {getDate(ticket.createdAt)}
                      </Text>
                    </View>
                  </View>
                );
              })
            }
          </View>
        </View>

        <FAB
          icon={plusIcon}
          placement='right'
          color='#F37130'
          onPress={() => setShowAddComplaintForm(true)}
        />

        <Dialog
          isVisible={showAddComplaintForm}
          onBackdropPress={() => setShowAddComplaintForm(false)}
          overlayStyle={{
            width: 300,
          }}
          backdropStyle={{
            backgroundColor: "rgba(0,0,0,0.8)",
          }}>
          <Dialog.Title
            title='Raise a Ticket :'
            titleStyle={{ alignSelf: "center" }}
          />
          <Divider style={{ marginBottom: 20 }} />
          <View
            style={{
              gap: 15,
            }}>
            <View>
              <Text style={{ fontWeight: "700", marginBottom: 6 }}>
                Ticket Subject :
              </Text>
              <View
                style={{
                  borderWidth: 1.5,
                  borderColor: "#f5f5f5",
                  alignItems: "center",
                  justifyContent: "center",
                  height: 30,
                }}>
                <Input
                  inputContainerStyle={{
                    borderBottomWidth: 0,
                    height: 30,
                    margin: 0,
                  }}
                  onChangeText={(value) => {
                    addComplaintData["subject"] = value;
                    setAddComplaintData({...addComplaintData});
                  }}
                  containerStyle={{
                    flex: 1,
                  }}
                  inputStyle={{
                    fontSize: 14,
                  }}
                />
              </View>
            </View>

            <View>
              <Text style={{ fontWeight: "700", marginBottom: 6 }}>
                Ticket Message :
              </Text>
              <View
                style={{
                  borderWidth: 1.5,
                  borderColor: "#f5f5f5",
                  alignItems: "center",
                  justifyContent: "center",
                  height: 100,
                }}>
                <Input
                  inputContainerStyle={{
                    borderBottomWidth: 0,
                  }}
                  containerStyle={{
                    flex: 1,
                  }}
                  onChangeText={(value) => {
                    addComplaintData["message"] = value;
                    setAddComplaintData({...addComplaintData});
                  }}
                  inputStyle={{
                    fontSize: 14,
                  }}
                  multiline={true}
                  numberOfLines={4}
                />
              </View>
            </View>

            <View>
              <Button
                title={isLoading?"Wait...":"Submit"}
                onPress={addComplaintHandler}
                disabled={isLoading}
                buttonStyle={{
                  backgroundColor: "#33056F",
                  borderRadius: 6,
                }}
              />
            </View>
          </View>
        </Dialog>
        {/* </View> */}
      </>
    )
  );
}
