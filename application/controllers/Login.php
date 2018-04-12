<?php 
    defined('BASEPATH') OR exit('No direct script access allowed');
    class Login extends CI_Controller {
        public $data = array();
        public function __construct()
        {
                parent::__construct();
                $this->load->model('user_model');
                $this->load->helper('url_helper');
                $this->load->library('session');
                $this->load->database();
        }
        public function login_user()
        {
            header("Content-type:application/json");
            $postdata = file_get_contents("php://input");
            $client_data = json_decode($postdata);

            $response = array("error" => FALSE);

            global $errors,
                $email,
                $password;

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

                if(count($errors)!=0){
                    $response['response_code'] =  500;
                    $response['error'] = $errors;
                    $response['message'] = '';
                    echo json_encode($response);
                }else{
                    $data = array(
                        'email' =>  $email,
                        'password' => $encrypted_pssword
                    );
                    $query = $this->db->query("SELECT * FROM users where email='$email' && password='$encrypted_pssword';");
                    $row = $query->row();
                    if (isset($row))
                    {
                        // set array of items in session
                        $arraydata = array(
                            'session_id'  => uniqid(),
                            'userdata' => $row
                        );
                        $this->session->set_userdata($arraydata);
                        $dbData = $this->session->userdata()['userdata'];
                        $userdata['usredata']['id'] = $dbData->id;
                        $userdata['usredata']['firstname'] = $dbData->firstname;
                        $userdata['usredata']['lastname'] = $dbData->lastname;
                        $userdata['usredata']['email'] = $dbData->email;
                        $userdata['usredata']['mobile'] = $dbData->mobile;
                        $userdata['usredata']['address'] = $dbData->address;
                        $userdata['usredata']['state'] = $dbData->state;
                        $userdata['usredata']['pin'] = $dbData->pin;
                        $userdata['session_id'] = $this->session->userdata()['session_id'];


                        $response['message'] = 'Success!';
                        $response['data'] = $userdata;
                        $response['response_code'] =  200;
                        echo json_encode($response);
                    }
                    else
                    {
                        $response['error'] = TRUE;
                        $response['message'] =  'Email or Password is incorrect.';
                        $response['response_code'] =  500;
                        echo json_encode($response);
                    }
                }
        }
    }
?>