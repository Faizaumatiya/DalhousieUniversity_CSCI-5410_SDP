import json
import boto3
client = boto3.client('dynamodb')
result = {}
intent=""
studentName=""
studentEmail=""
slots=""

def lambda_handler(event, context):
    global intent

    intent=event['sessionState']['intent']['name'] 
    global slots
    
    if event['invocationSource'] == 'FulfillmentCodeHook':
        slots=event['sessionState']['intent']['slots']
        studentEmail=slots['Email']['value']['originalValue']
        print(studentEmail)
        studentName=slots['Name']['value']['originalValue']
        print(studentName)
        if intent=='StudentVerification':
            verifyStudentInformation(studentEmail,studentName)
            print(result)
            return result

def verifyStudentInformation(emailFromBot,nameFromBot):
    responseFromDB = client.get_item(
            TableName='StudentDetails',
            Key={
                'student_email': {
                    'S': emailFromBot,
                }
            }
            )
    key='Item'
    value = key in responseFromDB.keys()
    if value:
        studentNameDB=responseFromDB['Item']['student_name']['S']
        studentEmailDB=responseFromDB['Item']['student_email']['S']
        
        message=""
        if (studentEmailDB.__eq__(emailFromBot) and studentNameDB.__eq__(nameFromBot)):
            message = "Your details are verified"
        else:
            print("inside else of match if ")
            message = "Your details couldn't be verified: name did not match with the information provided"
        global result
    # Result to lex bot
        result = {
                    "sessionState": {
                        "dialogAction": {
                            "type": "Close"
                        },
                        "intent": {
                            'name':intent,
                            'slots': slots,
                            'state':'Fulfilled'
                        }
                    },
                    "messages": [
                        {
                            "contentType": "PlainText",
                            "content": message
                        }
                    ]
                }
        return result
    else:
        message="Sorry I can't find your details in our records : email does not exists in our database"
        result =  {
                    "sessionState": {
                        "dialogAction": {
                            "type": "Close"
                        },
                        "intent": {
                            'name':intent,
                            'slots': slots,
                            'state':'Fulfilled'
                        }
                    },
                    "messages": [
                        {
                            "contentType": "PlainText",
                            "content": message
                        }
                    ]
                }
        return result

# Code Reference:
# [1] https://github.com/venkateshkodumuri/Lex_Chatbot_to_fetch_data_from_dynamodb/blob/main/lambda_function.py
# [2] https://github.com/PradipNichite/Youtube-Tutorials/blob/main/Amazon_Lex/Part2.py
