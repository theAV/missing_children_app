<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class Reports extends CI_Controller {
    public $data = array();
    public function __construct()
        {
                parent::__construct();
                $this->load->model('user_model');
                $this->load->helper('url_helper');
                $this->load->library('session');
                $this->load->helper(array('form', 'url'));
                $this->load->database();
        }
        public function submit_report(){          
            
                header("Content-type:application/json");
                $postdata = file_get_contents("php://input");
                $client_data = json_decode($postdata);

                $config['upload_path']          = 'uploads';
                $config['allowed_types']        = 'gif|jpg|png';
                $config['max_size']             = 1000000;
                $config['max_width']            = 1024;
                $config['max_height']           = 768;

                echo json_encode($client_data);
                // $this->load->library('upload', $config);

                // if ($this->upload->do_upload('file'))
                // {
                //     $data = array('upload_data' => $this->upload->data());
                //     echo json_encode($data);
                // }
                // else
                // {
                //     $error = array('error' => $this->upload->display_errors());
                //         echo json_encode($error);
                // }
        }
}

?>