from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.core.validators import RegexValidator


class MyUserManager(BaseUserManager):
    def create_user(self, first_name, last_name, email, username, password=None):
        if not email:
            raise ValueError('User Must Have A Email Address')

        if not username:
            raise ValueError('User Must Have A Username')
        user = self.model(
            email=self.normalize_email(email),
            first_name=first_name,
            last_name=last_name,
            username=username,
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, first_name, last_name, email, username, password):
        user = self.create_user(
            email=self.normalize_email(email),
            username=username,
            password=password,
            first_name=first_name,
            last_name=last_name,
        )
        user.is_admin = True
        user.is_active = True
        user.is_staff = True
        user.is_superuser = True
        user.save()


class User(AbstractUser):
    REQUIRED_FIELDS = ['first_name', 'last_name', 'email']
    is_admin = models.BooleanField(default=False)
    is_sub = models.BooleanField(default=False)
    is_customer = models.BooleanField(default=False, null=True)
    token = models.CharField(max_length=150, null=True)
    phone_regex = RegexValidator(
        regex=r'^(?:\+88|88)?(01[3-9]\d{8})$')
    mobile_number = models.CharField(max_length=11, validators=[phone_regex], unique=True, help_text="Phone number must be entered in the format: '+8801XXXXXXXXX'.", null=True, blank=True) # noqa
    system_name = models.CharField(max_length=30, null=True, blank=True)
    address = models.CharField(max_length=50, null=True, blank=True)
    title = models.CharField(max_length=40, null=True, blank=True)
    footer_message = models.CharField(max_length=80, null=True, blank=True)
    obj = MyUserManager()



class Sadmin(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, primary_key=True)
    create_date = models.DateTimeField(auto_now_add=True)

class Subadmin(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, primary_key=True)
    create_date = models.DateTimeField(auto_now_add=True)

class Customer(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, primary_key=True)
    create_date = models.DateTimeField(auto_now_add=True)