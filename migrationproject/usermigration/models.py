from django.db import models


class Gender(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class Education(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class Occupation(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class Status(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class Country(models.Model):
    name = models.CharField(max_length=50)
    latitude = models.FloatField()
    longitude = models.FloatField()

    def __str__(self):
        return self.name


class Flow(models.Model):
    start_date = models.DateField()
    end_date = models.DateField()
    description = models.TextField()
    status = models.ForeignKey(Status, on_delete=models.CASCADE)
    from_country = models.ForeignKey(Country, on_delete=models.CASCADE, related_name='flows_from')
    to_country = models.ForeignKey(Country, on_delete=models.CASCADE, related_name='flows_to')
    user = models.ForeignKey('authen.User', on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.start_date} - {self.end_date}, {self.from_country.name} - {self.to_country.name}"


class FlowDetails(models.Model):
    age = models.IntegerField()
    income = models.DecimalField(max_digits=19, decimal_places=2)
    gender = models.ForeignKey(Gender, on_delete=models.CASCADE)
    education = models.ForeignKey(Education, on_delete=models.CASCADE)
    occupation = models.ForeignKey(Occupation, on_delete=models.CASCADE)
    flow = models.ForeignKey(Flow, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.age} - {self.income}"
