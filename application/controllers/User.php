<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class User extends CI_Controller {

        public function __construct()
        {
                parent::__construct();
                $this->load->model('user_model');
                $this->load->helper('url_helper');
        }

        public function index()
        {
                $data['news'] = $this->user_model->get_user();
                $data['title'] = 'News archive';
                $this->load->view('users', $data);
        }

        public function view($slug = NULL)
        {
                $data['news_item'] = $this->user_model->get_user($slug);
        }
}