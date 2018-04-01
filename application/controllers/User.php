<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class User extends CI_Controller {
        public $data = array();
        public function __construct()
        {
                parent::__construct();
                $this->load->model('user_model');
                $this->load->helper('url_helper');
                // $this->load->library('curl');
                // $_json_response = new MY_Controller ();
        }

        public function index()
        {
                header('Content-type: application/json');                

                $data['users'] = $this->user_model->get_user();
                // $this->load->view('users', $data);
                echo json_encode($data);
        }

        public function get_users($slug = NULL)
        {
                $data['news_item'] = $this->user_model->get_user($slug);
                echo json_encode($data);
        }
}