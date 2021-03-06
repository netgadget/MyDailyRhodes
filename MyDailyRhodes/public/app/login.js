Ext.ns('login', 'Ext.ux');

login.LoginForm = {
	scroll: 'vertical',
	url   : '/app/Settings/do_login',
	standardSubmit : false,
	items: [
	{
		xtype: 'fieldset',
		title: '',
		instructions: 'Please enter your credentials.',
		defaults: {
			required: true,
			labelAlign: 'left',
			labelWidth: 100
		},
		items: [
		{
			xtype: 'textfield',
			name : 'login',
			label: 'Login',
			useClearIcon: true,
			autoCapitalize : false
		}, {
			xtype: 'passwordfield',
			name : 'password',
			label: 'Password',
			useClearIcon: true,
			autoCapitalize : false
			}]
		}
		],
		listeners : {
			submit : function(form, result){
				console.log('success', Ext.toArray(arguments));
			},
			exception : function(form, result){
				console.log('failure', Ext.toArray(arguments));
			}
		},
		dockedItems: [
		{
			xtype: 'toolbar',
			dock: 'bottom',
			items: [
				{
					text: 'Reset',
					handler: function() {
						login.form.reset();
					}
				}, 
				{
					text: 'About',
					ui: 'action',
					handler: function() {
						// create the root panel
					    new Ext.Panel({
					        fullscreen: true,
					        items: [
					          // add a panel to the root panel
					          { 
					            xtype: "form",
					            items: [{
					    			xtype: 'textfield',
					    		    name : 'name',
					    		    style: 'font-family: verdana; font-size: 15px; font-weight: bold',
					    		    value: 'CSC Mobile Solution',
					    		    readOnly: true,
					    		    autoCapitalize : false
					    		}, {
					    			xtype: 'textfield',
					    		    name : 'version',
					    		    label: 'Version:',
					    		    value: 'Service Release 1',
					    		    readOnly: true,
					    		    autoCapitalize : false
					    		}, {
					    			xtype: 'textfield',
					    		    name : 'buildid',
					    		    label: 'Build id:',
					    		    value: '20100917-0705',
					    		    readOnly: true,
					    		    autoCapitalize : false
					    		}, {
					                xtype: 'textfield',
					                name:  'url',
					                label: 'Website',
					                readOnly: true,
					                value: 'http://www.csc.com'
					    		}, {
					                xtype: 'datepickerfield',
					                name: 'date',
					                label: 'Date',
					                picker: { yearFrom: 2011 },
					    		 	handler: function(picker, date) {
					    		 		// do something with the selected date
					    	        }
					    		}, {
					    			xtype: 'textfield',
					    		    name : 'copyright',
					    		    style: 'font-family: verdana; font-size: 8px',
					    		    placeHolder: '(c) Copyright CSC contributors and others 2011. All rights reserved.',
					    		    readOnly: true,
					    		    autoCapitalize : false
					    	    }, {
					    			html: '<div style="text-align: center;"><img src="/public/images/csc_small.png" /></div>'	    	    
					    	    }]
				            }]

					    });
					}
				},
				{
					text: 'Login',
					ui: 'confirm',
					handler: function() {
						login.form.submit({
							waitMsg : {message:'Submitting', cls : 'demos-loading'}
						});
					}
				}, {
					// or just try this and don't forget to load the .js file at index.erb
					text: 'Check',
					ui: 'action',
					handler: function() {
						about.CompanyForm.fullscreen = true;
						about.form = new Ext.form.FormPanel(about.CompanyForm);
						about.form.show();
					}
				}, {
					// error requesting geolocation -> NOTE: Allow geolocation at device!!!
					text: 'Geo',		
					handler: function(){
						  var center;	  
						  var map = new Ext.Map({
						    geo:new Ext.util.GeoLocation({
						      autoUpdate: false,
						      timeout: 2000,
						      listeners: {
						        locationupdate: function(geo) {
						          center = new google.maps.LatLng(geo.latitude, geo.longitude);

						          if (map.rendered)
						            map.update(center)
						          else
						            map.on('activate', map.onUpdate, map, {single: true, data: center});
						        },
						        locationerror: function(geo){
						          alert('...got geolocation request error!');          
						        }
						      }
						    })
						  });
						  var panel = new Ext.Panel({
						    fullscreen:true,
						    layout:'fit',
						    items:map,
						    dockedItems:{xtype:'button', text:'click me', handler:function() { alert(center.lat() + ',' + center.lng()) }}
						  });
						}
				}, {
					// try embedding google map
					text: 'Map',
					handler: function() {
						// create the root panel
					      new Ext.Panel({
					        fullscreen: true,
					        items: [
					          {
					            xtype: "map",
					            title: 'Map',
					            getLocation: true
					          }
					        ]});
						} 
				}
				]
			}
			]

		};