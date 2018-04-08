<?php
    defined('BASEPATH') OR exit('No direct script access allowed');
    class Logout extends CI_Controller {
        public function __construct()
        {
                parent::__construct();
                $this->load->model('user_model');
                $this->load->helper('url_helper');
                $this->load->library('session');
                
        }
        public function get_user_logout(){

            $response = array("error" => FALSE);

            if($this->session->userdata('session_id')){
                $this->session->unset_userdata('session_id');
                $this->session->sess_destroy();

                $response['loggedin'] = FALSE;
                $response['message'] = 'You are logged Out.';
                $response['response_code'] =  200;
                echo json_encode($response);
            }else{
                $response['loggedin'] = FALSE;
                $response['message'] = 'You are already logged out.';
                $response['response_code'] =  500;
                echo json_encode($response);
            }
        }
    }
?>