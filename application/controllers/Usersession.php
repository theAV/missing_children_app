<?php
    defined('BASEPATH') OR exit('No direct script access allowed');
    class Usersession extends CI_Controller {
        public function __construct()
        {
                parent::__construct();
                $this->load->model('user_model');
                $this->load->helper('url_helper');
                $this->load->library('session');
                
        }
        public function get_sesion_user(){
            
            if($this->session->userdata('session_id')){
                echo 'login';
            }else{
                echo 'not login';
            }
        }
    }
?>