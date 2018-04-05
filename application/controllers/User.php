<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class User extends CI_Controller {
        public $data = array();
        public function __construct()
        {
                parent::__construct();
                $this->load->model('user_model');
                $this->load->helper('url_helper');
                $this->load->database();
        }
        
        public function store_users()
        {
                header("Content-type:application/json");
                $postdata = file_get_contents("php://input");
                $client_data = json_decode($postdata);
                $response = array("error" => FALSE);

                global $errors,
                
                //field variables
                $firstname,
                $lastname,
                $email,
                $password,
                $encrypted_pssword,
                $mobile,
                $address,
                $state,
                $pin;          
                
                

                if(isset($client_data->firstname) && $client_data->firstname != '')
                {
                        $firstname = $client_data->firstname;
                        if($firstname == ''){
                                $errors['firstname'] = 'First Name is not valid';
                        }
                }
                else
                {
                        $errors['firstname'] = 'First Name is required';
                }

                if(isset($client_data->lastname) && $client_data->firstname != '')
                {
                        $lastname = $client_data->lastname;
                }
                else
                {
                        $lastname = '';
                }

                // validate email
                if(isset($client_data->email)  && $client_data->email != ''){
                        $email = $client_data->email;
                        if($email == ''){
                                $errors['email'] = 'Email is not valid';
                        }
                }
                else{
                        $errors['email'] = 'Email is required';
                }

                // validate password
                if(isset($client_data->password) && $client_data->password != ''){
                        $password = $client_data->password;
                        $encrypted_pssword = md5($password);
                        $password_legn = strlen((string) $client_data->password);
                        if($password_legn != 8){
                                $errors['password'] = 'Password is not valid. Password must be 8 characters long';
                        }
                }
                else{
                        $errors['password'] = 'Password is required';
                }

                // validate mobile
                if(isset($client_data->mobile) && $client_data->mobile != ''){
                        $mobile = $client_data->mobile;
                        if(!preg_match('/^\d{10}$/', $mobile)){
                                $errors['mobile'] = 'Mobile number is not valid';
                        }
                }
                else{
                        $errors['mobile'] = 'Mobile number is required';
                }

                // validate address
                if(isset($client_data->address) && $client_data->address != '')
                {
                        $address = $client_data->address;
                }
                else
                {
                        $errors['address'] = 'Address is required';
                }

                // validate state
                if(isset($client_data->state) && $client_data->state != '')
                {
                        $state = $client_data->state;
                }
                else
                {
                        $errors['state'] = 'State is required';
                }

                // validate pin
                if( isset($client_data->pin) && $client_data->pin != ''){
                        $pin = $client_data->pin;
                        if(!preg_match('/^\d{6}$/', $pin)){
                                $errors['pin'] = 'Pin code is not valid. Pin code should be contain 6 Numbers.';
                        }
                }
                else{
                        $errors['pin'] = 'Pin code is required';
                }

                if(count($errors)!=0){
                        $response['response_code'] =  500;
                        $response['error'] = $errors;
                        $response['message'] = '';
                        echo json_encode($response);
                }else{  
                                                
                        $data = array(
                                'firstname' => $firstname,
                                'lastname' => $lastname,
                                'email' =>  $email,
                                'password' => $encrypted_pssword,
                                'mobile' => $mobile,
                                'address' => $address,
                                'state' => $state,
                                'pin' => $pin
                        );
                       
                        $query = $this->db->query("SELECT * FROM users where email='$email';");
                        $row = $query->row();
                        if (isset($row))
                        {
                                $response['message'] = 'Email already exists.';
                                $response['response_code'] =  500;
                                echo json_encode($response);
                        }else{
                                $this->db->trans_start();
                                $this->db->insert('users', $data);
                                $this->db->trans_complete();

                                if ($this->db->trans_status() === FALSE)
                                {
                                        $response['error'] = "Unknown error.";
                                        $response['response_code'] =  500;
                                        echo json_encode($response);
                                }else{                                
                                        $response['message'] = 'You are successfully registered';
                                        $response['response_code'] =  200;
                                        echo json_encode($response);
                                }
                        }

                }
        }
}