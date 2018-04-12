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
                
                $response = array("error" => FALSE);

                $client_data = $this->input->post();


                global $errors,
                    $firstname,
                    $lastname,
                    $gender,
                    $age,
                    $height,
                    $missingdate,
                    $missinglocation,
                    $mentally_ill,
                    $dif_abled,
                    $hairColor, 
                    $eye_color, 
                    $complexion, 
                    $build, 
                    $spectacles, 
                    $top_wear, 
                    $bottom_wear, 
                    $foot_wear,
                    $address,
                    $state,
                    $pin,
                    $fir_state,
                    $entry_date,
                    $description,
                    $photo,
                    $creater_id;


                if($this->session->userdata('session_id'))
                {

                    /**
                    *   photo upload
                    */
                    if(isset($_FILES['file']))
                    {
                        //file data
                        $file = $_FILES;
                        $fileName = $file['file']['name'];
                        $fileTemp = $file['file']['tmp_name'];
                        $fileSize = $file['file']['size'];
                        $fileExtension = explode('.', $fileName);
                        $fileExtension = strtolower(end($fileExtension));
                        $fileNewName = uniqid().".".$fileExtension;
                        $store = 'uploads/missings/'.$fileNewName;

                        //file data upload
                        if($fileExtension == 'jpg' || $fileExtension == 'png' || $fileExtension == 'gif'){
                            if($fileSize >= 1000000){
                                $errors['photo'] = "File size should be 1 MB.";
                            }else{
                                if(move_uploaded_file($fileTemp, $store)){
                                    $photo = $fileNewName;
                                    $response['message'] = 'image is uplaoded.';
                                }
                            }
                        }else{
                            $errors['photo'] = "Only jpg, png or gif allowd.";
                        }
                    }
                    else
                    {
                        $errors['photo'] = 'Photo is required';
                    }

                    /**
                    *   firstname
                    */                    
                    if(isset($client_data['firstname']) && $client_data['firstname'] != '')
                        {
                          $firstname = $client_data['firstname'];     
                        }
                        else
                        {
                                $errors['firstname'] = 'First Name is required';
                        }

                     /**
                    *   lastname
                    */                    
                    if(isset($client_data['lastname']) && $client_data['lastname'] != '')
                    {
                      $lastname = $client_data['lastname'];     
                    }
                    else
                    {
                            $errors['lastname'] = 'Last Name is required';
                    }
                    
                    $creater_id = $client_data['creater'];

                    $gender = $client_data['gender']; 

                    $age = $client_data['age'];

                    $mentally_ill = $client_data['mentally_ill'];

                    $dif_abled = $client_data['dif_abled'];
                    
                    $spectacles = $client_data['spectacles'];
                     /**
                    *   height
                    */                    
                    if(isset($client_data['height']) && $client_data['height'] != '')
                    {
                        $height = $client_data['height'];
                    }
                    else
                    {
                        $height = "";
                    }

                    /**
                    *   missing date
                    */                    
                    if(isset($client_data['missingdate']) && $client_data['missingdate'] != '')
                    {
                        $missingdate = $client_data['missingdate'];
                    }
                    else
                    {
                        $errors['missingdate'] = 'Missing date is required';
                    }

                    /**
                    *   missing location
                    */                    
                    if(isset($client_data['missinglocation']) && $client_data['missinglocation'] != '')
                    {
                        $missinglocation = $client_data['missinglocation'];
                    }
                    else
                    {
                        $errors['missinglocation'] = 'Missing Location is required';
                    }
                    /**
                    *   haircolor
                    */                    
                    if(isset($client_data['hairColor']) && $client_data['hairColor'] != '')
                    {
                        $hairColor = $client_data['hairColor'];
                    }
                    else
                    {
                        $hairColor = "";
                    }
                    /**
                    *   eye_color
                    */                    
                    if(isset($client_data['eye_color']) && $client_data['eye_color'] != '')
                    {
                        $eye_color = $client_data['eye_color'];
                    }
                    else
                    {
                        $eye_color = "";
                    }
                    /**
                    *   complexion
                    */                    
                    if(isset($client_data['complexion']) && $client_data['complexion'] != '')
                    {
                        $complexion = $client_data['complexion'];
                    }
                    else
                    {
                        $complexion = "";
                    }
                    /**
                    *   build
                    */                    
                    if(isset($client_data['build']) && $client_data['build'] != '')
                    {
                        $build = $client_data['build'];
                    }
                    else
                    {
                        $build = "";
                    }
                    /**
                    *   top_wear
                    */                    
                    if(isset($client_data['top_wear']) && $client_data['top_wear'] != '')
                    {
                        $top_wear = $client_data['top_wear'];
                    }
                    else
                    {
                        $top_wear = "";
                    }
                    /**
                    *   bottom_wear
                    */                    
                    if(isset($client_data['bottom_wear']) && $client_data['bottom_wear'] != '')
                    {
                        $bottom_wear = $client_data['bottom_wear'];
                    }
                    else
                    {
                        $bottom_wear = "";
                    }
                    /**
                    *   foot_wear
                    */                    
                    if(isset($client_data['foot_wear']) && $client_data['foot_wear'] != '')
                    {
                        $foot_wear = $client_data['foot_wear'];
                    }
                    else
                    {
                        $foot_wear = "";
                    }
                    /**
                    *   address
                    */                    
                    if(isset($client_data['address']) && $client_data['address'] != '')
                    {
                        $address = $client_data['address'];
                    }
                    else
                    {
                        $errors['address'] = 'Address is required';
                    }
                    /**
                    *   state
                    */                    
                    if(isset($client_data['state']) && $client_data['state'] != '')
                    {
                        $state = $client_data['state'];
                    }
                    else
                    {
                        $errors['state'] = 'State is required';
                    }
                    /**
                    *   pin
                    */                    
                    if(isset($client_data['pin']) && $client_data['pin'] != '')
                    {
                        $pin = $client_data['pin'];
                        if(!preg_match('/^\d{6}$/', $pin)){
                                $errors['pin'] = 'Pin code is not valid. Pin code should be contain 6 Numbers.';
                        }
                    }
                    else
                    {
                        $errors['pin'] = 'Pin code is required';
                    }
                    
                     /**
                    *   fir_state
                    */                    
                    if(isset($client_data['fir_state']) && $client_data['fir_state'] != '')
                    {
                        $fir_state = $client_data['fir_state'];
                    }
                    else
                    {
                        $errors['fir_state'] = 'FIR state is required';
                    }
                     /**
                    *   entry_date
                    */                    
                    if(isset($client_data['entry_date']) && $client_data['entry_date'] != '')
                    {
                        $entry_date = $client_data['entry_date'];
                    }
                    else
                    {
                        $errors['entry_date'] = 'FIR Date is required';
                    }

                     /**
                    *   description
                    */                    
                    if(isset($client_data['description']) && $client_data['description'] != '')
                    {
                        $description = $client_data['description'];
                    }
                    else
                    {
                        $description = '';
                    }

                    /**
                    * finanl response
                    */
                    if(count($errors)!=0){
                        $response['response_code'] =  301;
                        $response['error'] = $errors;
                        $response['message'] = "";
                        echo json_encode($response);
                    }else if(count($errors)>0){
                        $response['response_code'] =  301;
                        $response['error'] = $errors;
                        $response['message'] = "All * are fileds required.";
                        echo json_encode($response);  
                    }else{
                        $data = array(
                                'submitedby' => $creater_id,
                                'firstname' => $firstname,
                                'lastname' => $lastname,
                                'gender' =>  $gender,
                                'age' => $age,
                                'height' => $height,
                                'missingdate' => $missingdate,
                                'missing_location' => $missinglocation,
                                'mentally_ill' => $mentally_ill,
                                'differently_abled' => $dif_abled,
                                'description' => $description,
                                'hair_color' => $hairColor,
                                'eye_color' => $eye_color,
                                'complexion' => $complexion,
                                'build' => $build,
                                'spectacles' => $spectacles,
                                'top_wear' => $top_wear,
                                'bottom_wear' => $bottom_wear,
                                'foot_wear' => $foot_wear,
                                'address' => $address,
                                'state' => $state,
                                'pin' => $pin,
                                'entry_date' => $entry_date,
                                'fir_state' => $fir_state,
                                'photo' => $photo
                        );
                        $this->db->trans_start();
                        $this->db->insert('reports', $data);
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
                else
                {
                    echo 'Please Log In.';
                }
        }

        public function get_reports(){
                $response = array("error" => FALSE);
                $query = $this->db->query("SELECT * FROM reports");
               
                $response['reports'] = $query->result();


                echo json_encode($response);
        }
}

?>