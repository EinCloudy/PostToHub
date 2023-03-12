# PostToNest
a fast way to transfer your current tab to your Nest-Hub using CATT

Introducing PostToNest - the handy system that empowers Home Assistant users to effortlessly send their browsing tabs directly to their Google Nest Hub with a simple browser extension. Say goodbye to the hassle of manually sharing links and hello to the convenience of seamless integration. With PostToNest, you can easily curate your browsing experience and enhance your smart home setup all at once. 

## Dependencies
- Home Assistant with CATT
- Chrome-Extension compatible Browser

## Installation of CATT
1. use the terminal addon from Home assistant
2. run the command `pip3 install catt` um CATT zu installieren

## Make CATT available even if the Homeassistant Core updated
1. Edit the `configuration.yml`-File
2. Add this block to it:

```yml
shell_command:
  catt_install: "pip3 install catt"
  ```
  
3. Now create an automation with the trigger `on start` in Home Assistant that runs the service `Run Shell Command 'catt_install'`
